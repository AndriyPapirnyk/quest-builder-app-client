import React, { useState } from 'react'
import './Register.scss'
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
    <div>
      <h2>Реєстрація</h2>
      <form onSubmit={handleRegistration}>
        <input type="text" placeholder="Логін" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Повторіть пароль" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
        <button type="submit">Створити</button>
      </form>
      <p>Вже маєте акаунт? <a href="/login">Увійдіть</a></p>
    </div>
  )
}

export default Register