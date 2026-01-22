const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

  const { fullname, email, password } = req.body;

  const isUserAlreadyExists= await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({  
      message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user= await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET);

  res.cookie('token', token,) 


  res.status(201).json({
    message: 'User registered successfully',
    user: {
      __id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET);

  res.cookie('token', token,);

  res.status(200).json({
    message: 'Login successful',
    user: {
      __id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

function logoutUser(req, res) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, businessName, businessAddress, phone } = req.body;

  const isAccountalreadyExists= await foodPartnerModel.findOne({ email });

  if (isAccountalreadyExists) {
    return res.status(400).json({  
      message: 'Account already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner= await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    businessName,
    businessAddress,
    phone,
  });

  const token = jwt.sign({
    id: foodPartner._id,
  }, process.env.JWT_SECRET);

  res.cookie('token', token,);  

  res.status(201).json({
    message: 'Food Partner registered successfully',
    foodPartner: {
      __id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      businessName: foodPartner.businessName,
      businessAddress: foodPartner.businessAddress,
      phone: foodPartner.phone,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }       

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({
    id: foodPartner._id,
  }, process.env.JWT_SECRET);

  res.cookie('token', token,);

  res.status(200).json({
    message: 'Login successful',
    foodPartner: {
      __id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
