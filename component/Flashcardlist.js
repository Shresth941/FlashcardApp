import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/flashcards/${id}`)
      .then(response => {
        setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      {flashcards.length > 0 && (
        <Flashcard
          question={flashcards[currentIndex].question}
          answer={flashcards[currentIndex].answer}
          id={flashcards[currentIndex].id}
          onDelete={handleDelete}
        />
      )}
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default FlashcardList;