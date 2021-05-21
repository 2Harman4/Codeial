//importing model
const User = require('../models/user');

module.exports.profile = function(req,res){
   //check if there is user-id in the cookies
   if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(err){
                console.log('error in Cookie matching');
            }

            //user found
            if(user){
                res.render('user_profile.ejs',{
                    title: 'User Profile',
                    user:user
                });
            }
        });

   }else{
       return res.redirect('/users/sign-in');
   }
};

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'CODEIAL | Sign Up'
    });
};

//render the sign in page
module.exports.signIn = function(req,res){
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

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('User is not found on signing in');
            return;
        }

        //handle user found
        if (user){
            
            //handle password which don't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{
            //handle user not found
            //bak to the sign in page
            return res.redirect('back');
        }

    });
};

//signing Out 
module.exports.signOut = function(req,res){
    //delete the cookie
    //end session
    res.clearCookie('user_id');
    
    //redirecting to sign-in page
    return res.redirect('/users/sign-in');
};