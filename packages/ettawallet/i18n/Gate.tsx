/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useContext } from 'react';
import locales from './locales';
import { useAsync } from 'react-async-hook';
import { findBestAvailableLanguage } from 'react-native-localize';
import { DEFAULT_APP_LANGUAGE } from '../src/config';
import { initI18n } from './';
import { EttaStorageContext } from '../storage/context';
import useChangeLanguage from './useChangeLanguage';
import { navigateToError } from '../src/navigation/NavigationService';
import Logger from '../src/utils/logger';

interface Props {
  loading: React.ReactNode;
  children: React.ReactNode;
}

const I18nGate = ({ loading, children }: Props) => {
  const changelanguage = useChangeLanguage();
  const { language } = useContext(EttaStorageContext);
  const bestLanguage = findBestAvailableLanguage(
    Object.keys(locales)
  )?.languageTag;

  const i18nInitResult = useAsync(
    async () => {
      await initI18n(language || bestLanguage || DEFAULT_APP_LANGUAGE);
      if (!language && bestLanguage) {
        await changelanguage(bestLanguage);
      }
    },
    [],
    {
      onError: error => {
        Logger.error('i18n', 'Failed init i18n', error);
        navigateToError('appInitFailed', error);
      },
    }
  );

  return i18nInitResult.loading
    ? (loading as JSX.Element)
    : (children as JSX.Element);
};

export default I18nGate;
