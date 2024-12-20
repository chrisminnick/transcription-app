// src/components/TranscriptionDisplay.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for displaying the transcribed text.
 * It receives the transcribed text as a prop and displays it in a formatted manner.
 * It also provides an option to send the text to the EditTranscription component for editing.
 */
const TranscriptionDisplay = ({ displayText }) => {
    return (
        <div className="transcription-container">
            <h3>Transcribed Text</h3>
            <p className="transcription-text">{displayText}</p>
        </div>
    );
};

// Prop types for the TranscriptionDisplay component
TranscriptionDisplay.propTypes = {
    displayText: PropTypes.string
};

// Default props for the TranscriptionDisplay component
TranscriptionDisplay.defaultProps = {
    displayText: ''
};

export default TranscriptionDisplay;
