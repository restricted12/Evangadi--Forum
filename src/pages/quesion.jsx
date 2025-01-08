import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../pages.css/qusion.css'
const Question = () => {
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
       const { data } = await axios.post(
        "http://localhost:7048/api/quesions/ask-questions",
        {
          title: titleValue,
          description: descriptionValue,
          tag: tagValue,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Response Data:", data);

      // Optionally store the new token if the response includes it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setSuccessMessage("Your question was posted successfully!");
      setTitleValue("");
      setDescriptionValue("");
      setTagValue("");

      // navigate("/home");
    } catch (err) {
      console.error("Error sending data:", err);
      setError("Failed to post your question. Please try again.");
    }
  };

  return (
    <main className="container my-5">
      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-center mb-4">Steps to Write a Good Question</h3>
        <ul className="">
          <li className="list-group-item">
            1.Summarize your problem in a one-line title.
          </li>
          <li className="list-group-item" >
            2.Describe your problem in more detail.
          </li>
          <li className="list-group-item" >
            3.Describe what you tried and what you expected to happen.
          </li>
          <li className="list-group-item">
            4.Review your question and post it to the site.
          </li>
        </ul>
      </div>


      <div className="bg-white p-4 rounded shadow-sm mt-4">
        <h3 className="text-center mb-3">Ask a Public Question</h3>
        <div className="text-center mb-3">
         <Link to="/home" className="text-primary text-decoration-none fw-bold">Go to Quesion Page</Link>
        </div>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="questionTitle" className="form-label"></label>
            <input
              type="text"
              className="form-control"
              id="questionTitle"
              placeholder="Enter the title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="questionDescription" className="form-label"></label>
            <textarea
              className="form-control"
              id="questionDescription"
              rows="5"
              placeholder="Describe your question..."
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="questionTag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="questionTag"
              placeholder="Enter a tag (e.g., React, JavaScript)"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger text-center">{error}</div>}
         
          <button type="submit" className="btn btn-primary w-20">Post Your Question</button>
        </form>
      </div>
    </main>
  );
};

export default Question;










