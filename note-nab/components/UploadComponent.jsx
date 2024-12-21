// src/components/UploadComponent.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

/**
 * Component for handling the upload of image files for transcription.
 * This component provides an interface for users to select an image file,
 * which is then passed to the useTranscription hook for processing.
 */
const UploadComponent = ({ transcribeImage }) => {
  const [file, setFile] = useState(null);

  /**
   * Handles the image selection from the library.
   * Sets the selected file to state and initiates transcription.
   */
  const handleUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.assets && result.assets.length > 0) {
      let newFile = null;
      if (result.assets[0].file) {
        newFile = result.assets[0].file;
        setFile(newFile);
        await transcribeImage(newFile);
      } else {
        // If no file is available, use the base64 data
        newFile = result.assets[0].base64;
        setFile(newFile);
        await transcribeImage(null, newFile);
      }

      setFile(newFile);
      await transcribeImage(newFile);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload your image for transcription</Text>
      <Button title="Select Image" onPress={handleUpload} />
    </View>
  );
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
});

export default UploadComponent;
