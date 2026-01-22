import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partnerName = e.target.partnerName.value;
    const businessName = e.target.businessName.value;
    const businessAddress = e.target.businessAddress.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    console.log('RegisterPartner submit', { partnerName, businessName, businessAddress, email, phone });
    try {
      const response = await axios.post('http://localhost:3000/api/auth/foodPartner/register', {
        name: partnerName,
        businessName,
        businessAddress,
        email,
        phone,
        password
      }, {
        withCredentials: true
      });

      console.log('RegisterPartner response', response);
      if (response && response.status >= 200 && response.status < 300) {
        // After registering, go to create-food so partner can add items immediately
        navigate('/create-food');
      } else {
        console.warn('Unexpected register response', response);
      }
    } catch (err) {
      console.error('RegisterPartner error', err);
      const msg = err?.response?.data?.message || err.message || 'Unknown error';
      alert('Registration failed: ' + msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand" />
          <div>
            <div className="auth-title">Partner signup</div>
            <div className="auth-sub">Create a food-partner account to receive orders</div>
          </div>
          <Link to="/user/register" className="switch-toggle secondary">Switch to user</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Partner name</label>
            <input name="partnerName" className="form-input" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label className="form-label">Business name</label>
            <input name="businessName" className="form-input" placeholder="Restaurant or store name" />
          </div>
          <div className="form-group">
            <label className="form-label">Business address</label>
            <input name="businessAddress" className="form-input" placeholder="Street, city" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" className="form-input" placeholder="you@business.com" />
          </div>

          <div className="row">
            <div style={{flex:1}} className="form-group">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-input" placeholder="+1 555 555 5555" />
            </div>
            <div style={{flex:1}} className="form-group">
              <label className="form-label">Password</label>
              <input name="password" className="form-input" placeholder="Password" type="password" />
            </div>
          </div>

          <button type="submit" className="btn">Create account</button>

          <div className="alt-links">
            <div>Already partner?</div>
            <a className="link" href="/food-partner/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPartner
