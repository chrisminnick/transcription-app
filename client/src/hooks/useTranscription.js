// src/hooks/useTranscription.js
import { useState } from 'react';

/**
 * Custom hook to handle the transcription of images using Tesseract.js.
 * This hook encapsulates the logic for image transcription, providing an easy interface
 * for components to transcribe images and handle transcription state.
 */
const useTranscription = () => {
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Transcribes the given image file using OpenAI's API.
   * @param {File} image - The image file to be transcribed.
   */
  const transcribeImage = async (image) => {
    setIsLoading(true);
    setTranscription('');
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:3000/transcribe', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      setTranscription(result.response.choices[0].message.content);
    } catch (err) {
      setError('Failed to transcribe image. Please try again.');
      console.error('Error during image transcription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transcribeImage,
    transcription,
    isLoading,
    error,
  };
};

export default useTranscription;
