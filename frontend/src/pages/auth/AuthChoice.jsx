import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'

const AuthChoice = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand" />
          <div>
            <div className="auth-title">Welcome</div>
            <div className="auth-sub">Register as a normal user or a food partner</div>
          </div>
        </div>

        <div className="auth-form">
          <div className="switch-line">
            <div className="switch-label">Switch:</div>
            <div className="switch-links">
              <Link to="/user/register" className="switch-link active">User</Link>
              <div className="switch-sep">·</div>
              <Link to="/food-partner/register" className="switch-link">Food partner</Link>
            </div>
          </div>

          <Link to="/user/register" className="btn">Register as user</Link>
          <Link to="/food-partner/register" className="btn secondary">Register as food partner</Link>

          <div className="alt-links">
            <div>Already registered?</div>
            <div>
              <Link className="link" to="/user/login">User login</Link>
              {' • '}
              <Link className="link" to="/food-partner/login">Partner login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthChoice
