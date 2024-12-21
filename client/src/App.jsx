import React from 'react';
import { useState } from 'react';
import UploadComponent from './components/UploadComponent';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import EditTranscription from './components/EditTranscription';
import useTranscription from './hooks/useTranscription';

/**
 * Root component that integrates UploadComponent, TranscriptionDisplay, and EditTranscription.
 * This component orchestrates the flow of data across the application.
 */
const App = () => {
  const { transcription, transcribeImage } = useTranscription();
  const [editedText, setEditedText] = useState('');

  // Function to handle saving the edited text, could be expanded to save to a backend
  const handleSave = (editedText) => {
    console.log('Saved text:', editedText);
    // Here you could add functionality to save the edited text to a database or another service
  };

  return (
    <div className="app-container">
      <h1>Image Transcription Application</h1>
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
    </div>
  );
};

export default App;
