//importing model
const User = require('../models/user');

//render profile page
module.exports.profile = function(req,res){  
    //find user
    User.findById(req.params.id,function(err, user){
        res.render('user_profile.ejs',{
            title: 'User Profile',
            profile_user:user
        });
    })
};

//update profile details
module.exports.update = function(req,res){
    //preventing user to fidle with html code to change the id being sent for update 
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success', "Profile Updation Successful");
            return res.redirect('back');
        });
    }else{
        return res.status(401).send("Unauthorised");
    }
}

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
        req.flash('error','Unmatched Passwords!');
        return res.redirect('back');
    }

    //checking is email id entered exits in db
    User.findOne({email: req.body.email}, function(err,user){
        
        if(err){
            req.flash('error',err);
            return;
        }

        //New user
        if(!user){
            //create user
            User.create(req.body,function(err,user){
                if(err){
                    req.flash('error','error in creating user while signing up');
                    return;
                }
                //created 
                req.flash('error','Account created successfully!');
                return res.redirect('/users/sign-in');
                
            });
        }else{
            //user present, redirect sign Up page
            req.flash('error','You already have an account. Please Sign In');
            return res.redirect('/users/sign-in');
        }

    });
};

//handled by passport.js local strategy
//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged In Successfully!!');
    return res.redirect('/');
}

//sign out and destroy the session
module.exports.destorySession = function(req,res){
    //function given by passport
    req.logout();
    req.flash('success','You have logged out!!');

    //to the homepage
    return res.redirect('/');
}