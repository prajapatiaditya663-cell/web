import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log('LoginPartner submit', { email });
    try {
      const response = await axios.post('http://localhost:3000/api/auth/foodPartner/login', {
        email,
        password
      }, {
        withCredentials: true
      });
      console.log('LoginPartner response', response);
      if (response && response.status >= 200 && response.status < 300) {
        navigate('/create-food');
      } else {
        console.warn('Unexpected login response', response);
      }
    } catch (err) {
      console.error('LoginPartner error', err);
      const msg = err?.response?.data?.message || err.message || 'Unknown error';
      alert('Login failed: ' + msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand" />
          <div>
            <div className="auth-title">Partner sign in</div>
            <div className="auth-sub">Sign in to manage your orders</div>
          </div>
          <Link to="/user/login" className="switch-toggle secondary">User login</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" className="form-input" placeholder="you@business.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" className="form-input" placeholder="Password" type="password" />
          </div>

          <button type="submit" className="btn">Sign in</button>

          <div className="alt-links">
            <div>Need an account?</div>
            <a className="link" href="/food-partner/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPartner
