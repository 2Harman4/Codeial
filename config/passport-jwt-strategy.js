const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

//this module will help us  extract jwt from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'//decryption key
}

passport.use(new JWTStrategy(opts, function(jwtPayload , done){

    User.findById(jwtPayload._id , function(err,user){
        if(err){
            console.log("error in finding user from jwt");
            return;
        }

        if(user){
            
            return done(null,user);
        }else{
            
            return done(null,false);
        }
    });
}));

module.exports = passport;