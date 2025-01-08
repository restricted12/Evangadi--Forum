import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handlesubmit } from './handlesubmit';
import '../pages.css/bootstrap.css';
import '../pages.css/login.css';

function Login() {
  const navigate = useNavigate();
  const emailnamedom = useRef();
  const password = useRef();

  return (
      <section class="container mt-3 body3 mb-2">
        <div class="row bg-white">
  
          <div class="col-md-6 first_container border p-4 rounded-3"
            style={{
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // Custom shadow
              color: '#FE8402',
  
            }}>
            <div>
              <br />
              <br />
              <h3 className='text-center text-dark'>Login to your account</h3>
              <br />
              <p className='text-center text-dark' >
                Don't have an account?
                <Link to={'/register'} style={{ color: '#FE8402' }}className='text-decoration-none'> Creat anew account</Link>
              </p>
            </div>
            <form onSubmit={(e) =>
              handlesubmit(e, emailnamedom, password, navigate)
            }
            className="mt-6">
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
              <br />
              <center>
                <button type="submit" class="btn text-white w-50" style={{ backgroundColor: '#FE8402' }}>
                  Submit
                </button>
              </center>
  
            </form>
  
            <p className='text-center'>
              <br />
              <Link to={'/register'} style={{ color: '#FE8402' }} className='text-decoration-none'>Creat an account?</Link>
            </p>
          </div>
  
  
          <div class="col-md-6 second  p-4">
            <h3 className='mt-5'>About</h3>
            <h1 className='mt-5'><span style={{ color: '#db3d00' }}>Eva<span style={{ color: '#984221' }}>ngadi</span></span> <span style={{ color: '#984221' }}>Networks</span> Q&A</h1>
            <p className='mb-5 '>
              The Evangadi Forum is an interactive platform that brings people together to engage in meaningful discussions, share ideas, and find solutions to various challenges. It allows users to create accounts, participate in conversations, and explore topics of interest in an organized and user-friendly environment. The platform encourages collaboration and knowledge sharing while maintaining a respectful community atmosphere. Designed with accessibility in mind, the forum is optimized for use on both desktop and mobile devices, making it a convenient space for users to connect, learn, and grow collectively.
            </p>
            <button className="btn btn-warning w-40 mt-3" style={{ background: '#FE8402' }}>
              <span className="fs-6 fw-bold">HOW IT WORKS</span>
            </button>
  
          </div>
        </div>
      </section>
  
    );
  }

export default Login;
