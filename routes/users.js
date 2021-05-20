const express = require('express');
const router = express.Router();

//importing the controller 
const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

//route for sign up page
router.get('/sign-up',usersController.signUp);

//route for sign in page
router.get('/sign-in',usersController.signIn);

//route for new user creation 
router.post('/create',usersController.create);

module.exports = router;
