import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const RegisterUser = () => {

  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullname: fullName,
      email,
      password
    }, {
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
            <div className="auth-title">Create account</div>
            <div className="auth-sub">Create a user account to order food</div>
          </div>
          <Link to="/food-partner/register" className="switch-toggle">Switch to partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input name="fullname" className="form-input" placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" className="form-input" placeholder="you@mail.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" className="form-input" placeholder="Password" type="password" />
          </div>

          <button type="submit" className="btn">Create account</button>

          <div className="alt-links">
            <div>Already have an account?</div>
            <a className="link" href="/user/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterUser
