import React, { useState, useEffect } from 'react';
import './Holder.scss';
import Card from '../card/Card';
import axios from 'axios';

const CatalogHolder = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Кількість вікторин на сторінці

  const fetchQuizzes = async (currentPage = 1) => {
    try {
      const response = await axios.get(`http://localhost:8000/quizzes?page=${currentPage}&limit=${limit}`, { withCredentials: true });
      setQuizzes(response.data.quizzes);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Помилка при отриманні вікторин", err);
    }
  };

  useEffect(() => {
    fetchQuizzes(page);
  }, [page]);

  const handleDelete = () => {
    fetchQuizzes(page);
  };

  return (
    <section className='catalog__holder'>
      {quizzes.map((quiz) => (
        <Card key={quiz._id} title={quiz.title} description={quiz.description} questions={quiz.questions} quiz={quiz} onDelete={handleDelete} />
      ))}

      {/* Пагінація */}
      <div className="pagination">
        <button 
          className="pagination-button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Мин
        </button>
        <span>{page} з {totalPages}</span>
        <button 
          className="pagination-button"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Нас
        </button>
      </div>
    </section>
  );
};

export default CatalogHolder;
