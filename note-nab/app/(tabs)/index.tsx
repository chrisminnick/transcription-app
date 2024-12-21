import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import UploadComponent from '@/components/UploadComponent';
import TranscriptionDisplay from '@/components/TranscriptionDisplay';
import EditTranscription from '@/components/EditTranscription';
import useTranscription from '@/hooks/useTranscription';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
/**
 * Root component that integrates UploadComponent, TranscriptionDisplay, and EditTranscription.
 * This component orchestrates the flow of data across the application.
 */
const HomeScreen = () => {
  const { transcription, transcribeImage } = useTranscription();
  const [editedText, setEditedText] = useState('');

  // Function to handle saving the edited text, could be expanded to save to a backend
  const handleSave = (editedText: string) => {
    console.log('Saved text:', editedText);
    // Here you could add functionality to save the edited text to a database or another service
  };

  return (
    <ScrollView contentContainerStyle={styles.appContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Image Transcription Application</ThemedText>
      </ThemedView>
      <UploadComponent transcribeImage={transcribeImage} />
      <TranscriptionDisplay
        displayText={editedText ? editedText : transcription}
      />
      <EditTranscription
        initialText={transcription}
        onSave={handleSave}
        editedText={editedText}
        setEditedText={setEditedText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default HomeScreen;
