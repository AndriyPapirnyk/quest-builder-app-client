import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./RunQuiz.scss";

const PlayQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizId = location.state?.quiz._id;

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/quizzes/${quizId}`);
        setQuiz(response.data);
        setStartTime(Date.now());
      } catch (error) {
        console.error("Помилка завантаження вікторини", error);
        navigate("/");
      }
    };
    fetchQuiz();
  }, [quizId, navigate]);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const handleSubmit = async () => {
    const endTime = Date.now();
    const timeSpent = ((endTime - startTime) / 1000).toFixed(2);
    setCompletionTime(timeSpent);
    
    try {
      const response = await axios.post(`http://localhost:8000/quizzes/${quizId}/submit`, {
        answers,
        timeSpent,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Помилка при надсиланні результату", error);
      alert("Не вдалося надіслати результат");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const handleQuit = () => {
    navigate("/");
  }

  return (
    <div className="runQuiz">
    <div className="runQuiz__container">
        <div className="runQuiz__content">
        <div className="runQuiz__info">
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
        </div>
      {quiz.questions.map((q, qIndex) => (
        <div className="question" key={qIndex}>
          <p>{q.text}</p>
          {q.type === "text" ? (
            <input
              type="text"
              onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
              placeholder="Anwer here"
            />
          ) : (
            q.options.map((opt, oIndex) => (
              <label key={oIndex}>
                <input
                  type={q.type === "single" ? "radio" : "checkbox"}
                  name={`question-${qIndex}`}
                  value={opt}
                  onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                />
                {opt}
              </label>
            ))
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Finish</button>
      {completionTime && (
        <div>
          <p>Time: {completionTime} seconds</p>
          <h2>Results:</h2>
          {result && (
            <ul>
              {result.correctAnswers.map((ans, index) => (
                <li key={index}>
                  <b>{quiz.questions[index].text}:</b> {ans.correct ? "✅" : "❌"} (Correct answers: {ans.correctAnswer})
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleQuit}>Quit</button>
        </div>
      )}
        </div>
    </div>
    </div>
  );
};

export default PlayQuiz;
