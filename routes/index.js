const express = require('express');
//inbuilt express module
const router = express.Router();
//fetching the controller
const homeController = require('../controllers/home_controller');

//to check
console.log("Router Loaded");

//accesing controller
router.get('/',homeController.home);


//to enable its usage in other files probably server index.js
module.exports = router;