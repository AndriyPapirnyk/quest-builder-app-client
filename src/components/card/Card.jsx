import React from 'react'
import './Card.scss'

const Card = () => {
  return (
    <div className='card'>
        <div className="card__section">
        <div className="card__name">
            <h2>Quiz name</h2>
            <div className='card__name-button'>
                <div></div><div></div><div></div>
            </div>
        </div>
        <p className='card__description'>Quiz description</p>
        </div>
        <div className="card__questions">Questions: 17</div>
    </div>
  )
}

export default Card