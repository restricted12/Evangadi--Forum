import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pages.css/bootstrap.css";
import { VscAccount } from "react-icons/vsc";
import "../pages.css/Answerpage.css";
import { Link } from "react-router-dom";
const QuestionDetail = () => {
  const { questionId } = useParams(); // Extract question ID from the URL
  const [question, setQuestion] = useState(null); // State for question details
  const [answers, setAnswers] = useState([]); // State for community answers
  const [newAnswer, setNewAnswer] = useState(""); // State for new answer input
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // State for loading question
  const [answerLoading, setAnswerLoading] = useState(true); // State for loading answers
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      if (!questionId) {
        setError("Invalid question ID");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:7048/api/quesions/detail-questions/${questionId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }

        const data = await response.json();
        setQuestion(data);
      } catch (err) {
        console.error("Error fetching question details:", err);
        setError("Unable to fetch question details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:7048/api/answeres/get-answers/${questionId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch answers");
        }

        const data = await response.json();
        setAnswers(data);
      } catch (err) {
        console.error("Error fetching answers:", err);
        setError("Unable to fetch answers. Please try again later.");
      } finally {
        setAnswerLoading(false);
      }
    };

    if (questionId) {
      fetchQuestionDetails();
      fetchAnswers();
    }
  }, [questionId]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (!newAnswer.trim()) {
      alert("Answer cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:7048/api/answer/responsed-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          questionid: questionId,
          Answer: newAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the answer");
      }

      const data = await response.json();

      // Add the new answer to the answers array immediately
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          username: data.username || "Anonymous", // Use the server response or a default value
          answer: data.answer || newAnswer,       // Add the new answer text
        },
      ]);
      setNewAnswer(""); // Clear the input field
      setSuccessMessage("Your Answer is posted successfully!");
    } catch (err) {
      console.error("Error submitting answer:", err);
      alert("Failed to submit the answer. Please try again later.");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading question details...</p>;
  }

  return (
    <div className="container my-5">
      <h1 className=" mb-4">Question</h1>
      {question ? (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <strong>-</strong> {question.title}
            </h5>
            <p className="card-text">
              <strong>-</strong> {question.description}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">No question found.</p>
      )}

      <div className="mb-4">
        <h4>Answers From The Community</h4>
        <hr />
        <div className="community-answers-box">
          {answerLoading ? (
            <p className="text-center">Loading answers...</p>
          ) : answers.length > 0 ? (
            answers.map((ans, index) => (
              <div key={index} className="answer-community d-flex align-items-center mb-3">
                <div className="me-3 text-center">
                  <VscAccount size={40} />
                  <strong className="d-block mt-1">{ans.username || "Anonymous"}</strong>
                </div>
                <div>
                  <p className="m-0">{ans.answer || "No answer provided."}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No answers yet. Be the first to answer!</p>
          )}
        </div>

      </div>

      <div className="mb-4">
        <h4 className="text-center">Answer The Top Question</h4>
        <div className="text-center mb-3">
          <Link to="/home" className="text-primary text-decoration-none fw-bold">Go to Quesion Page</Link>
        </div>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        <form onSubmit={handleAnswerSubmit}>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write your answer here..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          
          <button type="submit" className="btn btn-primary">
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetail;
