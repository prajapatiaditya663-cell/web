
const foodModel = require('../models/food.model');
const storageService = require("../services/storage.service");
const likeModel = require('../models/likes.moodel');
const { v4: uuid } = require('uuid');
const saveModel = require('../models/save.model');


async function createFood(req, res) {

  console.log(req.foodPartner);

  console.log(req.body);
  console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id
  });

  res.status(201).json({
    message: "Food item created successfully",
    foodItem: foodItem 
  });

}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  res.status(200).json({
    foodItems: foodItems
  });
}

async function likeFood(req, res) {
   const foodId = req.body; 
   const user = req.user;

   const isAlreadyLiked = await likeModel.findOne({    
      food: foodId, 
      user: user._id 

   })
    if (!isAlreadyLiked) {

      await likeModel.create({
         food: foodId,
         user: user._id
      });

      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

      return res.status(200).json({
          message: 'Food unliked successfully'
      });
    }
    const like = await likeModel.findOneAndDelete({
       food: foodId,
       user: user._id
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(200).json({
        message: 'Food liked successfully'
    });

}

async function saveFood(req, res) {
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        food: foodId,
        user: user._id
    });

    if (!isAlreadySaved) {
        await saveModel.create({
            food: foodId,
            user: user._id
        });
        return res.status(200).json({
            message: 'Food saved successfully'
        });
    }

    await saveModel.findOneAndDelete({
        food: foodId,
        user: user._id
    });

    res.status(200).json({
        message: 'Food unsaved successfully'
    });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood
};