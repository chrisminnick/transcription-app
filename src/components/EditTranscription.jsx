// src/components/EditTranscription.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Component for editing the transcribed text.
 * It allows users to modify the text obtained from the transcription and save the edited text.
 */
const EditTranscription = ({
  initialText,
  onSave,
  editedText,
  setEditedText,
}) => {
  /**
   * Handles the change event on the textarea input.
   * Updates the state with the current value of the textarea.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event from the textarea.
   */
  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  /**
   * Handles the save button click event.
   * Calls the onSave callback with the edited text.
   */
  const handleSave = () => {
    onSave(editedText);
  };

  return (
    <div className="edit-container">
      <h3>Edit Transcription</h3>
      <textarea
        className="edit-textarea"
        value={editedText ? editedText : initialText}
        onChange={handleTextChange}
      />
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

// Prop types for the EditTranscription component
EditTranscription.propTypes = {
  initialText: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

// Default props for the EditTranscription component
EditTranscription.defaultProps = {
  initialText: '',
};

export default EditTranscription;
