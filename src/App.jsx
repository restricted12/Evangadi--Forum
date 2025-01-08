import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from '../src/axiosconfig';
import Header from './pages/Header';
import Footer from './pages/footer';
import Question from './pages/quesion';
import QuestionDetail from './pages/AnswerPage';
import E404 from './pages/Error'


// Correct context export
export  const AppContext = createContext();

function App() {
  const [user, setuser] = useState({}); // Set default username to avoid rendering issues
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkuser() {
    try {
      const { data } = await axios.get('http://localhost:7548/api/users/check', {
        headers: {
          authorization: token,
        },
      });
      console.log("User data from API:", data); // Debug user data
      setuser(data); // Ensure `data` contains the `username` field
    } catch (error) {
      console.error("Error checking user:", error?.response?.data || error.message);
      // Optionally navigate to login if token is invalid
      navigate('/login');
    }
  }

  useEffect(() => {
    checkuser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setuser }}>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/ask-questions' element={<Question />} />
        <Route path="/detail-questions/:questionId" element={<QuestionDetail />} />
        <Route path="*" element={<E404 />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  )};
  

export default App;
