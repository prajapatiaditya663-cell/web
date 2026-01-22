import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterUser from '../pages/auth/RegisterUser'
import LoginUser from '../pages/auth/LoginUser'
import RegisterPartner from '../pages/auth/RegisterPartner'
import LoginPartner from '../pages/auth/LoginPartner'
import AuthChoice from '../pages/auth/AuthChoice'
import Home from '../pages/general/home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'



function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthChoice />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/food-partner/register" element={<RegisterPartner />} />
        <Route path="/food-partner/login" element={<LoginPartner />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/profile" element={<Profile />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes