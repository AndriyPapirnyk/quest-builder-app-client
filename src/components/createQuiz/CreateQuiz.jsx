import React, { useState } from "react";
import axios from "axios";
import './CreateQuiz.scss'

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    if (field === "type" && value !== "text") {
      updatedQuestions[index].options = [""];
    }
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem('token'); // Отримуємо токен
      if (!token) {
        alert("Токен не знайдений. Будь ласка, увійдіть знову.");
        return;
      }
  
      await axios.post(
        "http://localhost:8000/quizzes",
        {
          title: quizTitle,
          description: quizDescription,
          questions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Додаємо токен у заголовок
          },
          withCredentials: true, // Якщо використовуєте куки для сесії
        }
      );
      alert("Вікторина створена!");
    } catch (error) {
      console.error("Помилка при створенні вікторини", error);
      alert("Помилка при створенні вікторини");
    }
  };
  
  
  

  return (
    <div className="createQuiz">
        <div className="createQuiz__container">
        <h2>Створити вікторину</h2>
      <input type="text" placeholder="Назва" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
      <textarea placeholder="Опис" value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} />
      <button onClick={addQuestion}>Додати питання</button>
      {questions.map((q, qIndex) => (
        <div key={qIndex}>
          <input type="text" placeholder="Питання" value={q.text} onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)} />
          <select value={q.type} onChange={(e) => handleQuestionChange(qIndex, "type", e.target.value)}>
            <option value="text">Текст</option>
            <option value="single">Один вибір</option>
            <option value="multiple">Кілька виборів</option>
          </select>
          <button onClick={() => removeQuestion(qIndex)}>Видалити</button>
          {q.type !== "text" && q.options.map((opt, oIndex) => (
            <div key={oIndex}>
              <input type="text" value={opt} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} />
              <button onClick={() => removeOption(qIndex, oIndex)}>Видалити</button>
            </div>
          ))}
          {q.type !== "text" && <button onClick={() => addOption(qIndex)}>Додати варіант</button>}
        </div>
      ))}
      <button onClick={submitQuiz}>Зберегти вікторину</button>
        </div>
    </div>
  );
};

export default CreateQuiz;
