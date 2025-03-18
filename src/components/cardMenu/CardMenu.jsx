import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CardMenu = ({ quiz, onDelete }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      const decoded = jwtDecode(token); 
      setUser(decoded); 
    }
  }, []);

  const handleDeleteQuiz = async () => {
    if (!user || user.userId !== quiz.createdBy) {
      alert("Ви не маєте права видаляти цю вікторину!");
      return;
    }

    try {
        console.log(user.userId === quiz.createdBy);
      await axios.delete(`https://quest-builder-app-45ef45724967.herokuapp.com/quizzes/${quiz._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      alert("Вікторину видалено!");
      onDelete();
    } catch (error) {
      console.error("Помилка при видаленні вікторини", error);
    }
  };

  const handleEditQuiz = () => {  
    navigate('/change-quiz', { state: { quiz } });
  }
  const handleRunQuiz = () => {  
    navigate('/run-quiz', { state: { quiz } });
  }

  return (
    <div className='card__menu'>
      <button className='card__menu-button' onClick={handleRunQuiz}>Run</button>
      {user?.userId === quiz.createdBy && (
        <>
          <button className='card__menu-button' onClick={handleEditQuiz}>Edit</button>
          <button className='card__menu-button' onClick={handleDeleteQuiz}>Delete</button>
        </>
      )}
    </div>
  );
};

export default CardMenu;
