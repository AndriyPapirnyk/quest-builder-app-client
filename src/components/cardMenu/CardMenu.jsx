import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CardMenu = ({ quiz, onDelete }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Отримуємо токен з localStorage
    if (token) {
      const decoded = jwtDecode(token); // Декодуємо токен
      setUser(decoded); // Зберігаємо користувача
    }
  }, []);

  const handleDeleteQuiz = async () => {
    if (!user || user.userId !== quiz.createdBy) {
      alert("Ви не маєте права видаляти цю вікторину!");
      return;
    }

    try {
        console.log(user.userId === quiz.createdBy);
      await axios.delete(`http://localhost:8000/quizzes/${quiz._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      alert("Вікторину видалено!");
      onDelete();
    } catch (error) {
      console.error("Помилка при видаленні вікторини", error);
      alert("Не вдалося видалити вікторину");
    }
  };

  const handleEditQuiz = () => {  
    navigate('/change-quiz', { state: { quiz } });
  }

  return (
    <div className='card__menu'>
      <button className='card__menu-button'>Run</button>
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
