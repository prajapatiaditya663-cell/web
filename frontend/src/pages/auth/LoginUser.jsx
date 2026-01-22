import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginUser = () => {
  
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post('http://localhost:3000/api/auth/user/login', {
      email,
      password
    },{
      withCredentials: true 
    });
    console.log(response.data);

    navigate('/home');
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand" />
          <div>
            <div className="auth-title">Welcome back</div>
            <div className="auth-sub">Sign in to your user account</div>
          </div>
          <Link to="/food-partner/login" className="switch-toggle">Partner login</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" className="form-input" placeholder="you@mail.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" className="form-input" placeholder="Password" type="password" />
          </div>

          <button type="submit" className="btn">Sign in</button>

          <div className="alt-links">
            <div>Need an account?</div>
            <a className="link" href="/user/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginUser
