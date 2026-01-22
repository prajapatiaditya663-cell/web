const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authFoodPartnerMiddleware(req, res, next) {

  const token = req.cookies.token;
  if (!token) {

    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('authFoodPartnerMiddleware: decoded id=', decoded.id);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    console.log('authFoodPartnerMiddleware: found foodPartner=', !!foodPartner);

    req.foodPartner = foodPartner;

    next();
  } 
  
  catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


async function authUserMiddleware(req, res, next) {

  const token = req.cookies.token; 
  if (!token) {

    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    req.user = user;
    
    next();
  } 
  
  catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


module.exports = {
  
  authFoodPartnerMiddleware,
  authUserMiddleware

}