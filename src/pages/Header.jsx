import React, { useContext } from 'react';
import Logo from '../Materials/10001.png';
import '../pages.css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'font-awesome/css/font-awesome.min.css'; 

export default function Header() {
    const { user, setuser } = useContext(AppContext); 
    const navigate = useNavigate();

   
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        setuser({});
        navigate('/login'); 
    };

    return (
        <header className="container-fluid bg-light py-3 sticky-top">
            <div className="row align-items-center">
                {/* Logo Section */}
                <div className="col-6 col-md-3 text-center">
                    <Link to="/home" className="d-inline-block">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="img-fluid"
                            style={{ maxHeight: '60px' }}
                        />
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav className="col-6 col-md-9">
                    <div className="navbar navbar-expand-md navbar-light">
                        {/* Custom Menu Icon (Font Awesome) */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="fa fa-bars"></span> {/* Custom Menu Icon */}
                        </button>

                        {/* Navbar Items */}
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link text-dark">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/how-it-works" className="nav-link text-dark">
                                        How it works
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    {isLoggedIn ? (
                                        <button onClick={handleLogout} className="btn btn-primary">
                                            Logout
                                        </button>
                                    ) : (
                                        <Link to="/login" className="btn btn-primary">
                                            SIGN IN
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
