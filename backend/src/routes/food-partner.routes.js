const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controllers/food-partner.controller');
// Public route to get partner details by id
const authMiddleware = require('../middlewares/auth.middleware');

// Return the currently-authenticated food partner (protected)
router.get('/profile', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getFoodPartnerProfile);

// Get a food partner by id (public)
router.get('/:id', foodPartnerController.getFoodPartnerById);

module.exports = router; // Add food-related routes here in the future