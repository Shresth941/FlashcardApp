import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddFlashcard = () => {
    axios.post('http://localhost:3001/api/flashcards', { question, answer })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form>
        <label>Question:</label>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <br />
        <label>Answer:</label>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <br />
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </form>
    </div>
  );
};

export default Dashboard;