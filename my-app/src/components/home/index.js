import React, { useState } from 'react';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./index.css"
import NavBar from '../Nav';

const Home = () => {
  const [textInput, setTextInput] = useState('');
 

  const handleAddTodo = async () => {
    if (textInput.trim() === '') {
      alert('Enter Valid Text');
      return;
    }

    const userId = localStorage.getItem('userId') || uuidv4();
    localStorage.setItem('userId', userId);

    const newTodo = {
      text: textInput,
      isChecked: false,
      userId: userId,
    };

    try {
      await axios.post('https://notes-v2-mind.onrender.com/api/todos', newTodo);
      setTextInput('');
      alert('Added Successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="todos-bg-container">
     <NavBar />
     <div className='container'>
      <h1 className='todos-heading'>Create Note</h1>
     <textarea
      cols={8}
      rows={8}
        type="text"
        value={textInput}
        className='todo-user-input'
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button className='button' onClick={handleAddTodo}>Add Note</button>
    </div>
     </div>
  );
};

export default Home;
