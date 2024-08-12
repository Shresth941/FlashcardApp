import React, { useEffect, useState } from 'react';
import Flashcard from './component/Flashcard';
import axios from 'axios';

import { FaLinkedin, FaGithub } from 'react-icons/fa';
function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch flashcards from the server
  useEffect(() => {
    axios.get('http://localhost:3001/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  // Navigate to the next flashcard
  const nextFlashcard = () => {
    setCurrent((prev) => (prev + 1) % flashcards.length);
  };

  // Navigate to the previous flashcard
  const prevFlashcard = () => {
    setCurrent((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  // Add a new flashcard
  const addFlashcard = () => {
    if (!newFlashcard.question || !newFlashcard.answer) {
      alert('Please enter both a question and an answer.');
      return;
    }

    axios.post('http://localhost:3001/add-flashcard', newFlashcard)
      .then(response => {
        setFlashcards([...flashcards, { id: response.data.id, ...newFlashcard }]);
        setNewFlashcard({ question: '', answer: '' });
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  // Edit an existing flashcard
  const editFlashcard = () => {
    if (!newFlashcard.question || !newFlashcard.answer) {
      alert('Please enter both a question and an answer.');
      return;
    }

    axios.put(`http://localhost:3001/edit-flashcard/${editingId}`, newFlashcard)
      .then(() => {
        setFlashcards(flashcards.map(flashcard =>
          flashcard.id === editingId ? { ...flashcard, ...newFlashcard } : flashcard
        ));
        setNewFlashcard({ question: '', answer: '' });
        setEditMode(false);
        setEditingId(null);
      })
      .catch(error => console.error('Error editing flashcard:', error));
  };

  // Delete a flashcard
  const deleteFlashcard = (id) => {
    axios.delete(`http://localhost:3001/delete-flashcard/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
        setCurrent(0); // Reset to the first flashcard after deletion
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  // Trigger edit mode with selected flashcard's data
  const triggerEditMode = (id) => {
    const flashcardToEdit = flashcards.find(flashcard => flashcard.id === id);
    setNewFlashcard({ question: flashcardToEdit.question, answer: flashcardToEdit.answer });
    setEditMode(true);
    setEditingId(id);
  };

  return (
    <div className="container">
      <h1>Flashcard Project</h1>
      
      {flashcards.length > 0 && (
        <><div className="navigation-buttons">
          <Flashcard {...flashcards[current]} />
          
            <button onClick={prevFlashcard} className='Previous'>Previous</button>
            <button onClick={nextFlashcard} className='next'>Next</button>
          </div>
         
        </>
      )}

      <div className="form-container">
        <h3 className='addnewflashcard'>{editMode ? 'Edit Flashcard' : 'Add New Flashcard'}</h3>
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        />
        {editMode ? (
          <button onClick={editFlashcard} className='update'>Update Flashcard</button>
        ) : (
          <button onClick={addFlashcard} className='ADD'>Add Flashcard</button>
        )}
      </div>
      <div className="edit-buttons">
            <button onClick={() => triggerEditMode(flashcards[current].id)} className='edit' >Edit</button>
            <button onClick={() => deleteFlashcard(flashcards[current].id)} className='delete'>Delete</button>
          </div>
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <svg className="bi" width="30" height="12">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">© Shresth Singh</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="https://github.com/Shresth941" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="https://www.linkedin.com/in/shresth-singh-6ab5051bb/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          </li>
        </ul>
      </footer>
          
    </div>
    

  );
}


export default App;
