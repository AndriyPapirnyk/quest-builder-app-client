import React, { useState } from "react";
import axios from "axios";
import './CreateQuiz.scss'
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [], correctAnswer: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    if (field === "type" && value !== "text") {
      updatedQuestions[index].options = [""];
      updatedQuestions[index].correctAnswer = "";
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

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectMultipleAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].correctAnswer.includes(value)) {
      updatedQuestions[qIndex].correctAnswer = updatedQuestions[qIndex].correctAnswer.filter(ans => ans !== value);
    } else {
      updatedQuestions[qIndex].correctAnswer = [...updatedQuestions[qIndex].correctAnswer, value];
    }
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
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Будь ласка, увійдіть знову.");
        return;
      }

  
      await axios.post(
        "https://quest-builder-app-45ef45724967.herokuapp.com/quizzes",
        {
          title: quizTitle,
          description: quizDescription,
          questions: questions.map(q => ({
            text: q.text,
            type: q.type,
            options: q.options || [],
            correctAnswers: Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer], 
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );         
      alert("Вікторина створена!");
      navigate("/");
    } catch (error) {
      console.error("Помилка при створенні вікторини", error);
      alert("Помилка при створенні вікторини");
    }
  };

  const handleQuit = () => {
    navigate("/");
  }

  return (
    <div className="createQuiz">
        <div className="createQuiz__container">
        <div className="createQuiz__header">
          <h1>Create Quiz</h1>
          <button onClick={handleQuit}>Back</button>
        </div>
        <div className="info-form">
          <input type="text" placeholder="Name" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
          <input placeholder="Description" value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} />
      <button onClick={addQuestion}>Add</button>
      {questions.map((q, qIndex) => (
        <div className="questions-form" key={qIndex}>
          <div className="content1">
          <input type="text" placeholder="Question" value={q.text} onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)} />
          <select value={q.type} onChange={(e) => handleQuestionChange(qIndex, "type", e.target.value)}>
            <option value="text">Text</option>
            <option value="single">One choice</option>
            <option value="multiple">Several options</option>
          </select>
          <button onClick={() => removeQuestion(qIndex)}>Delete</button>
          </div>
          {q.type === "text" && (
            <input type="text" placeholder="Correct Answer" value={q.correctAnswer} onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)} />
          )}
          {q.type !== "text" && q.options.map((opt, oIndex) => (
            <div className="content2" key={oIndex}>
              <input type="text" value={opt} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} />
              <input style={{width: 'auto'}} type={q.type === "single" ? "radio" : "checkbox"} name={`correct-${qIndex}`} checked={q.type === "single" ? q.correctAnswer === opt : q.correctAnswer.includes(opt)} onChange={() => q.type === "single" ? handleCorrectAnswerChange(qIndex, opt) : handleCorrectMultipleAnswerChange(qIndex, opt)} />
              <button onClick={() => removeOption(qIndex, oIndex)}>Delete</button>
            </div>
          ))}
          {q.type !== "text" && <button onClick={() => addOption(qIndex)}>Add</button>}
        </div>
      ))}
      <button onClick={submitQuiz}>Save</button>
        </div>
        </div>
    </div>
  );
};

export default CreateQuiz;
