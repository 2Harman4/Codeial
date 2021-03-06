//importing passport library
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//Importing model 
const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true
    },
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }

            if( !user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);//authentication is false and err is null
            }

            //user is found
            return done(null,user);//err is null
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err);
        }

        return done(null,user);
    });
});

//check if the user is authenticated(will be used as middleware)
passport.checkAuthentication = function(req,res,next){
    //if user is signed in ,then pass on req to next function( controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user isnt signed in
    req.flash('error','Sign In to view the Profile');
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user;
        
    }
    next();

}

//export passport (not strategy)
module.export = passport;