import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';

const TestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>Vibes</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    minHeight: 120,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default TestScreen;
