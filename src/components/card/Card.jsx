import React from 'react'
import './Card.scss'
import CardMenu from '../cardMenu/CardMenu';
import { useState } from 'react';

const Card = ({title, description, questions}) => {
  const [menuStatus, setmenuStatus] = useState(false)

  function getQuestionsAmount(questions) {
    return questions.length;
  }

  function showMenu() {
    setmenuStatus(!menuStatus)
  }

  return (
    <div className='card'>
      {menuStatus && <CardMenu />}
        <div className="card__section">
        <div className="card__name">
            <h2>{title}</h2>
            <div onClick={showMenu} className='card__name-button'>
                <div></div><div></div><div></div>
            </div>
        </div>
        <p className='card__description'>{description}</p>
        </div>
        <div className="card__questions">Questions: {getQuestionsAmount(questions)}</div>
    </div>
  )
}

export default Card