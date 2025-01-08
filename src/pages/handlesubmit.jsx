import axios from '../axiosconfig';

export async function handlesubmit(e, emailnamedom, password, navigate) {
    e.preventDefault();
  
    const emailnamedomvalue = emailnamedom.current.value;
    const passwordvalue = password.current.value;
  
    try {
      const { data } = await axios.post('http://localhost:7048/api/users/login', {
        email: emailnamedomvalue,
        password: passwordvalue,
      });
  
      alert('Welcome!');
      console.log(data);
  
      // Save the token and username to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
  
      // Navigate to home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data);
      alert(error?.response?.data?.msg || 'An error occurred during login.');
    }
  }
  