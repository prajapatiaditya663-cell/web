const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express.Router();

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);


router.post('/foodPartner/register', authController.registerFoodPartner);
router.post('/foodPartner/login', authController.loginFoodPartner);
router.get('/foodPartner/logout', authController.logoutFoodPartner);

module.exports = router;