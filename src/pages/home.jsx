import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App'; // Update import to match the renamed context
import '../pages.css/bootstrap.css';
import { VscAccount } from "react-icons/vsc";
import '../pages.css/home.css';
import { GrNext } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);  // Use the correct context
  const [questions, setQuestions] = useState([]);
  const username = localStorage.getItem('username') || 'Guest'; 
  useEffect(() => {
    console.log("User from context:", user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:7048/api/quesions/get-questions", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Questions:', data);
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions.');
      });
  }, []);

  const handleIconClick = (questionId) => {
    console.log('Navigating to Question ID:', questionId);
    navigate(`/detail-questions/${questionId}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-primary">
          <Link to="/ask-questions" className="text-white text-decoration-none">Ask Question</Link>
        </button>
        <p className="welcome-text mt-3">
          Welcome: <span className="text-primary fw-bold">{username}</span>
        </p>
      </div>
      <h4 className="mt-3 mb-3">Questions</h4>
      <hr />
      <div className="mt-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.questionid}>
              <div className="question-item d-flex align-items-center">
                <VscAccount size={60} />
                <div className="ms-4 flex-grow-1">
                  <p className="mb-0">{question.title}</p>
                </div>
                <button
                  className="btn btn-link"
                  onClick={() => handleIconClick(question.questionid)}
                >
                  <GrNext size={30} />
                </button>
              </div>
              <div className="ms-3">
                <h6>{question.username}</h6>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No questions available. Please check back later.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
