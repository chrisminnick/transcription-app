// src/components/TranscriptionDisplay.js
import React from 'react';
import * as Clipboard from 'expo-clipboard';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { ThemedText } from '@/components/ThemedText';

import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';

/**
 * Component for displaying the transcribed text.
 * It receives the transcribed text as a prop and displays it in a formatted manner.

 */
const TranscriptionDisplay = ({ displayText = '' }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(displayText);
    showMessage({
      message: 'Copied to Clipboard',
      type: 'info',
      duration: 1500,
    });
  };
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Transcribed Text</ThemedText>
      <Button
        title="Click here to copy to Clipboard"
        onPress={copyToClipboard}
      />

      <ThemedText type="default" selectable={true} selectionColor="blue">
        {displayText}
      </ThemedText>
    </View>
  );
};

// Prop types for the TranscriptionDisplay component
TranscriptionDisplay.propTypes = {
  displayText: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default TranscriptionDisplay;
