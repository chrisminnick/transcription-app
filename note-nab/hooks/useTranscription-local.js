// src/hooks/useTranscription.js
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';

// import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';
// import { useEventListener } from 'react-native-tesseract-ocr';
/**
 * Custom hook to handle the transcription of images using Tesseract.js.
 * This hook encapsulates the logic for image transcription, providing an easy interface
 * for components to transcribe images and handle transcription state.
 */
const useTranscription = () => {
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // useEventListener('onProgressChange', (p) => {
  //   setProgress(p.percent / 100);
  // });
  //const progress = 0;
  useEffect(() => {
    if (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        duration: 3000,
      });
    }
  }, [error]);
  /**
   * Transcribes the given image file using the appropriate library based on the platform.
   * @param {File} image - The image file to be transcribed.
   */
  const transcribeImage = async (image) => {
    setIsLoading(true);
    setTranscription('');
    setError(null);

    try {
      let text = '';
      if (Platform.OS === 'web') {
        // Dynamically import Tesseract.js for web
        const Tesseract = await import('tesseract.js');
        const { data } = await Tesseract.recognize(image, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(m.progress);
            }
          },
        });
        text = data.text;
      } else {
        // Use TesseractOCR for mobile
        // text = await TesseractOcr.recognize(image.uri, LANG_ENGLISH);
      }
      setTranscription(text);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transcribeImage,
    transcription,
    isLoading,
    error,
    progress,
  };
};

export default useTranscription;
