// EditMovie.js

import React, { useState } from 'react';

const EditMovie = ({ movie, handleEdit, handleCancel }) => {
  const [editedTitle, setEditedTitle] = useState(movie.Title);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSave = () => {
    // Implement the logic to save the edited movie
    handleEdit(movie.imdbID, editedTitle);
  };

  return (
    <div className="edit-movie-form">
      <input type="text" value={editedTitle} onChange={handleTitleChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditMovie;
