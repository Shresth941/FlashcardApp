import React from 'react';
import Flashcard from './Flashcard';

const App = () => {
  const flashcards = [
    { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
    { id: 2, question: 'What is the capital of Germany?', answer: 'Berlin' },
  ];

  const handleDelete = (id) => {
    console.log(`Deleting flashcard with id ${id}`);
    // Add logic to delete the flashcard from the array
  };

  return (
    <div>
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          question={flashcard.question}
          answer={flashcard.answer}
          id={flashcard.id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;