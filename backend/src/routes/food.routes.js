const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');


const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

// Public feed: allow unauthenticated users to GET food items
router.get('/', foodController.getFoodItems);

 
router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood);

router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood);

module.exports = router;// Add food-related routes here in the future