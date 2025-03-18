import React, { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://quest-builder-app-45ef45724967.herokuapp.com/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert("Невірний логін або пароль");
    }
  };

  return (
    <div className='login'>
      <div className="login__container">
      <div className="login__content">
        <h1>Welcome to Quiz App!</h1>
        <p>Welcome to QuizApp – a fun and interactive platform where <br /> you can create, share, and take quizzes on any topic! 🎉</p>
      </div>
      <form className='login__form' onSubmit={handleLogin}>
        <h2>USER LOGIN</h2>
        <div>
          <input type="text" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <p>Dont have an account? <a href="/register">Register</a></p>
      </form>
      </div>
    </div>
  )
}

export default Login