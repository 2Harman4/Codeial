//importing model
const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('user_profile.ejs',{
        title: 'User Profile'
    });
};

//render the sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'CODEIAL | Sign Up'
    });
};

//render the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'CODEIAL | Sign In'
    });
};

//get the sign up data
module.exports.create = function (req,res){
    //checking if password and confirm password are same or not
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //checking is email id entered exits in db
    User.findOne({email: req.body.email}, function(err,user){
        
        if(err){
            console.log('error in finding user in signing up ',err);
            return;
        }

        //New user
        if(!user){
            //create user
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up ',err);
                    return;
                }
                //created 
                return res.redirect('/users/sign-in');
                
            });
        }else{
            //user present, redirect sign Up page
            return res.redirect('back');
        }

    });
};

//handled by passport.js local strategy

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

//sign out and destroy the session
module.exports.destorySession = function(req,res){
    //function given by passport
    req.logout();
    //to the homepage
    return res.redirect('/');
}