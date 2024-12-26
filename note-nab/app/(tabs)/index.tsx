import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Switch,
  Platform,
} from 'react-native';

import UploadComponent from '@/components/UploadComponent';
import TranscriptionDisplay from '@/components/TranscriptionDisplay';
import EditTranscription from '@/components/EditTranscription';
import useTranscription from '@/hooks/useTranscription';
import useTranscriptionLocal from '@/hooks/useTranscription-local';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FlashMessage from 'react-native-flash-message';
// import * as Progress from 'expo-progress';

const HomeScreen = () => {
  const [useAI, setUseAI] = useState(() =>
    Platform.OS !== 'web' ? true : false
  );
  const [editedText, setEditedText] = useState('');

  const { transcription, transcribeImage, isLoading, progress } = useAI
    ? useTranscription()
    : useTranscriptionLocal();

  const handleSave = (editedText: string) => {
    setEditedText(editedText);
  };

  return (
    <ScrollView contentContainerStyle={styles.appContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">NoteNab</ThemedText>
      </ThemedView>

      {isLoading ? (
        <>
          <Image source={require('@/assets/images/linesmeeting.gif')} />
          {/* {progress && <Progress.Bar progress={progress} color="blue" />} */}
        </>
      ) : (
        <>
          <UploadComponent transcribeImage={transcribeImage} />
          {Platform.OS === 'web' && (
            <>
              <View style={styles.switchContainer}>
                <Text style={styles.typeWriter}>abc&nbsp;</Text>
                <Switch
                  value={useAI}
                  onValueChange={(value) => setUseAI(value)}
                />
                <Text style={styles.handwritingMode}>&nbsp;abc</Text>
              </View>
            </>
          )}
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
      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position="top" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  handwritingMode: {
    fontFamily: 'Cursive',
    fontSize: 20,
  },
  typeWriter: {
    fontFamily: 'American Typewriter',
    fontSize: 18,
  },
  appContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 8,
  },
});

export default HomeScreen;
