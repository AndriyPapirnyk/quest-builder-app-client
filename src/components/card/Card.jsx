import React from 'react'
import './Card.scss'

const Card = ({title, description, questions}) => {

  function getQuestionsAmount(questions) {
    return questions.length;
  }
  return (
    <div className='card'>
        <div className="card__section">
        <div className="card__name">
            <h2>{title}</h2>
            <div className='card__name-button'>
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