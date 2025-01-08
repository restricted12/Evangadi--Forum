import React from 'react'
import { useRef } from 'react'
import axios from '../axiosconfig'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../pages.css/register.module.css'
import '../pages.css/bootstrap.css'


function Register() {
  const navigate = useNavigate();
  const usernamedom = useRef();
  const firstnamedom = useRef();
  const lastnamedom = useRef();
  const emailnamedom = useRef();
  const password = useRef();

  async function handlesubmit(e) {
    e.preventDefault();
    // Log the values of the input fields
    const usernamedomvalue = usernamedom.current.value;
    const firstnamedomvalue = firstnamedom.current.value;
    const lastnamedomvalue = lastnamedom.current.value;
    const emailnamedomvalue = emailnamedom.current.value;
    const passwordvalue = password.current.value;

    try {
      await axios.post('http://localhost:7048/api/users/register', {
        username: usernamedomvalue,
        firstname: firstnamedomvalue,
        lastname: lastnamedomvalue,
        email: emailnamedomvalue,
        password: passwordvalue
      });
      
      alert('registered successfull please login');
      navigate('/login')
    } catch (error) {
      // alert('something went wrong!!');
      console.log(error.response)
    }
  }

  return (
    <section class="container mt-4 body2">
      <div class="row bg-white">

        <div class="col-md-6 first_container border p-4 rounded-3"
        style={{
         boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // Custom shadow
         color: '#FE8402',
         
  }}>
          <div>
            <br />
            <h3 className='text-center text-dark'>Join the network</h3>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <br />
            <p className='text-center'>
              Already have an account?
              <Link to={'/login'}style={{ color: '#FE8402' }}className='text-decoration-none'>signin</Link>
            </p>
          </div>
          <form onSubmit={handlesubmit} className='mt-6'>
            <div class="mb-3 email">
              <label for="email" class="form-label"></label>
              <input
                ref={emailnamedom}
                type="email"
                id="email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div className='row'>
              <div class="mb-3 first_name col ">
                <label for="first_name" class="form-label"></label>
                <input
                  ref={firstnamedom}
                  type="text"
                  id="first_name"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="mb-3 last_name col">
                <label for="last_name" class="form-label"></label>
                <input
                  ref={lastnamedom}
                  type="text"
                  id="last_name"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div class="mb-3 user_name">
              <label for="username" class="form-label"></label>
              <input
                ref={usernamedom}
                type="text"
                id="username"
                class="form-control"
                placeholder="Username"
              />
            </div>
            <div class="mb-3 password">
              <label for="password" class="form-label"></label>
              <input
                ref={password}
                type="password"
                id="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              Agree and join
            </button>
          </form>
          <p class="mt-3 text-center text-dark" >
            I agree to the <a href="#"style={{ color: '#FE8402' }}className='text-decoration-none'>Privacy Policy</a> and
            <a href="#"style={{ color: '#FE8402' }}className='text-decoration-none'>Terms of Services</a>
          </p>
          <p className='text-center'>
            <Link to={'/login'}style={{ color: '#FE8402' }}className='text-decoration-none'>Already have an account</Link>
          </p>
        </div>
        
        
        <div class="col-md-6 second  p-4">
          <h3 className='mt-5'>About</h3>
          <h1 className='mt-5'><span style={{ color: '#db3d00' }}>Eva<span style={{ color: '#984221' }}>ngadi</span></span> <span style={{ color: '#984221' }}>Networks</span> Q&A</h1>
          <p className='mb-5 '>
          The Evangadi Forum is an interactive platform that brings people together to engage in meaningful discussions, share ideas, and find solutions to various challenges. It allows users to create accounts, participate in conversations, and explore topics of interest in an organized and user-friendly environment. The platform encourages collaboration and knowledge sharing while maintaining a respectful community atmosphere. Designed with accessibility in mind, the forum is optimized for use on both desktop and mobile devices, making it a convenient space for users to connect, learn, and grow collectively.
          </p>
          <button className="btn btn-warning w-40 mt-3"style={{ background: '#FE8402' }}>
            <span className="fs-6 fw-bold">HOW IT WORKS</span>
          </button>

        </div>
      </div>
    </section>

  );
}

export default Register;
