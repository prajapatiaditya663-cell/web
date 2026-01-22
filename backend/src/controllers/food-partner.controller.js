const foodPartnerModel = require('../models/foodpartner.model');
const foodModel= require('../models/food.model');


async function getFoodPartnerById(req, res) {
  try {
    const foodPartnerId = req.params.id;

    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    console.log('getFoodPartnerById: requested id=', foodPartnerId);

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    console.log('getFoodPartnerById: found=', !!foodPartner);

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner:{
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner

      }
      
  });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid food partner id' });
    }
    console.error('Error in getFoodPartnerById:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getFoodPartnerProfile(req, res) {
  try {
    const foodPartner = req.foodPartner;

    if (!foodPartner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }

    res.status(200).json({
      message: 'Food partner retrieved successfully',
      foodPartner
    });
  } catch (err) {
    console.error('Error in getFoodPartnerProfile:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getFoodPartnerById,
  getFoodPartnerProfile,
};