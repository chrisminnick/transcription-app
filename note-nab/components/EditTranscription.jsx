import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ThemedText } from '@/components/ThemedText';

const EditTranscription = ({ initialText, onSave }) => {
  const [editedText, setEditedText] = useState(initialText);

  const handleTextChange = (text) => {
    setEditedText(text);
  };

  const handleSave = () => {
    onSave(editedText);
  };

  return (
    <View style={styles.editContainer}>
      <ThemedText type="subtitle">Edit Transcription</ThemedText>
      <TextInput
        selectable={true}
        selectionColor="blue"
        style={styles.textInput}
        value={editedText}
        onChangeText={handleTextChange}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

EditTranscription.propTypes = {
  initialText: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  editedText: PropTypes.string,
  setEditedText: PropTypes.func,
};

const styles = StyleSheet.create({
  editContainer: {
    padding: 20,
  },

  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default EditTranscription;
