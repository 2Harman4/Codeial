const express = require('express');
const router = express.Router();
const passport = require('passport');

//importing the controller 
const usersController = require('../controllers/users_controller');

//profile page accesible only if signed in
//used middleware for that
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',passport.checkAuthentication,usersController.update);

//route for sign up page
router.get('/sign-up',usersController.signUp);
//route for new user creation 
router.post('/create',usersController.create);

//route for sign in page
router.get('/sign-in',usersController.signIn);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:'/users/sign-in'
}), usersController.createSession);

//route for sign out
router.get('/sign-out',usersController.destorySession);

module.exports = router;
