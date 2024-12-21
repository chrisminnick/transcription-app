import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import UploadComponent from '@/components/UploadComponent';
import TranscriptionDisplay from '@/components/TranscriptionDisplay';
import EditTranscription from '@/components/EditTranscription';
import useTranscription from '@/hooks/useTranscription';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HomeScreen = () => {
  const { transcription, transcribeImage, isLoading } = useTranscription();
  const [editedText, setEditedText] = useState('');

  const handleSave = (editedText: string) => {
    setEditedText(editedText);
  };

  return (
    <ScrollView contentContainerStyle={styles.appContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">NoteNab</ThemedText>
      </ThemedView>
      {isLoading ? (
        <Image source={require('@/assets/images/linesmeeting.gif')} />
      ) : (
        <>
          <UploadComponent transcribeImage={transcribeImage} />
          {transcription && (
            <>
              <TranscriptionDisplay
                displayText={editedText ? editedText : transcription}
              />
              <EditTranscription
                initialText={transcription}
                onSave={handleSave}
                editedText={editedText}
                setEditedText={setEditedText}
              />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 8,
  },
});

export default HomeScreen;
