import React from 'react'
import './Holder.scss'
import Card from '../card/Card'
import axios from 'axios'
import {useState, useEffect} from 'react'

const CatalogHolder = () => {
  const [quizzes, setQuizzes] = useState([]); 

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quizzes", { withCredentials: true });
        setQuizzes(response.data); 
      } catch (err) {
        setError("Помилка при отриманні вікторин");
        console.error(err);
      }
    };

    fetchQuizzes(); 
  }, []); 

  return (
    <section className='catalog__holder'>
        {quizzes.map((quiz) => (
            <Card key={quiz._id} title={quiz.title} description={quiz.description} questions={quiz.questions} />
        ))}
    </section>
  )
}

export default CatalogHolder