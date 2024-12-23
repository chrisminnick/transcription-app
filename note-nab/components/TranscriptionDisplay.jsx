// src/components/TranscriptionDisplay.js
import React from 'react';
import * as Clipboard from 'expo-clipboard';
import { showMessage, hideMessage } from 'react-native-flash-message';

import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Button } from 'react-native';

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
      <Text style={styles.heading}>Transcribed Text</Text>
      <Button
        title="Click here to copy to Clipboard"
        onPress={copyToClipboard}
      />

      <Text selectable={true} selectionColor="blue" style={styles.text}>
        {displayText}
      </Text>
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default TranscriptionDisplay;
