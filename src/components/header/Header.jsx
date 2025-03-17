import React from 'react'
import './Header.scss'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigateToCreate = () => {
    navigate("/create-quiz");
  }

  return (
    <header className='catalog__header'>
        <h1 className='ctalog__header-title'>Quiz Catalog</h1>
        <div>
          <button onClick={navigateToCreate}>Create</button>
          <button onClick={handleLogout}>Quit</button>
        </div>
    </header>
  )
}

export default Header