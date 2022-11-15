/**
 *
 * Users will see this component once they've completed the manual backup process succesfully. They are then redirected in 3 seconds
 */

import React, { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@ettawallet/react-native-kit';
import { View, StyleSheet } from 'react-native';
import { Check } from '@ettawallet/rn-bitcoin-icons/dist/filled';
import colors from '../styles/colors';
import { navigate } from '../navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_PASSCODE_STORAGE_KEY } from '../../storage/consts';
import { EttaStorageContext } from '../../storage/context';

const ManualBackupComplete = () => {
  const { t } = useTranslation();
  const { manualBackupCompleted, phonePin, supportedBiometrics } =
    useContext(EttaStorageContext);
  const [userPasscode, setUserPasscode] = useState('');

  const checkPasscode = async () => {
    const savedPasscode = await AsyncStorage.getItem(USER_PASSCODE_STORAGE_KEY);
    setUserPasscode(savedPasscode);
    console.log('setPasscode', userPasscode);
  };

  useEffect(() => {
    checkPasscode(); // check the existence of Passcode. Still not perfect.
    const timer = setTimeout(() => {
      if (manualBackupCompleted) {
        if (!userPasscode && supportedBiometrics !== null) {
          navigate('ProtectWallet'); // should go to protect wallet
        } else if (!userPasscode && supportedBiometrics === null) {
          navigate('ProtectWallet'); // should go to protect wallet
        } else if (userPasscode && supportedBiometrics !== null) {
          navigate('ProtectWallet'); // should go to protect wallet
        } else if (userPasscode && supportedBiometrics === null) {
          navigate('TabsRoot'); // should go to wallet area
        } else {
          navigate('TabsRoot'); // should go to wallet area
        }
      } else {
        throw new Error(
          'Backup complete screen should not be reachable without completing backup'
        );
      }
    }, 3000); // redirect after 3 seconds
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Check
        style={{ alignSelf: 'center', marginTop: 50 }}
        width={100}
        height={100}
        color={colors.orangeUI}
      />
      <Text
        style={{ textAlign: 'center', marginBottom: 10 }}
        typography="h3"
        fontWeight="bold"
        fontColor="dark"
      >
        {t('manualBackupQuiz.backupVerified.title')}
      </Text>
      <Text
        style={styles.text}
        typography="h5"
        fontWeight="light"
        fontColor="dark"
      >
        {t('manualBackupQuiz.backupVerified.text')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  button: {
    marginBottom: 10,
  },
  footer: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 'auto',
  },
});

export default ManualBackupComplete;
