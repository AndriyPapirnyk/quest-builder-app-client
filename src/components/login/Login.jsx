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
      const res = await axios.post("http://localhost:8000/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert("Невірний логін або пароль");
    }
  };

  return (
    <div>
      <h2>Логін</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Логін" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Увійти</button>
      </form>
      <p>Ще не маєте аккаут? <a href="/register">Створіть</a></p>
    </div>
  )
}

export default Login