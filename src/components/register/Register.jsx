import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Паролі не співпадають");
        return;
    }

    try {
        await axios.post("http://localhost:8000/register", { password: password, username: username });
        alert("Реєстрація успішна! Тепер увійдіть.");
        navigate("/login");
    } catch (error) {
        alert("Помилка реєстрації. Можливо, логін вже зайнятий.");
        console.error("Error registering: ", error);
    }
  };

  return (
    <div className='login'>
      <div className="login__container">
      <div className="login__content">
        <h1>Welcome to Quiz App!</h1>
        <p>Welcome to QuizApp – a fun and interactive platform where <br /> you can create, share, and take quizzes on any topic! 🎉</p>
      </div>
      <form className='login__form' onSubmit={handleRegistration}>
        <h2>USER REGISTRATION</h2>
        <div>
           <input type="text" placeholder="Логін" value={username} onChange={(e) => setUsername(e.target.value)} />
           <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
           <input type="password" placeholder="Повторіть пароль" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
        <p>You have an account? <a href="/login">Login</a></p>
      </form>
      </div>
    </div>
  )
}

export default Register