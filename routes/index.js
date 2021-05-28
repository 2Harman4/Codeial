const express = require('express');
//inbuilt express module
const router = express.Router();
//fetching the controller
const homeController = require('../controllers/home_controller');

//to check
console.log("Router Loaded");

//accesing home controller
router.get('/',homeController.home);

//acces to other routers
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

//to enable its usage in other files probably server index.js
module.exports = router;