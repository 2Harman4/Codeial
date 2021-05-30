const express = require('express');
//importing cookie parser
const cookieParser = require('cookie-parser');
//create server
const app = express();
//by default websites run on port:80
const port = 8000;
//importing database configuration
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
//importing passport and strategy
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//connect-mongo
const MongoStore = require('connect-mongo')(session);

// importing sass middleware
const sassMiddleware = require('node-sass-middleware');



app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    //change debug to false in production mode
    debug: false,
    outputStyle: 'extended',
    prefix:'/css'
}));

//parser to read form data
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());

//defining a path to lookout for static files
app.use(express.static('./assets'));

//including layouts library
const expressLayouts = require('express-ejs-layouts');
//layout should be implemented before any other view
app.use(expressLayouts);

//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting view engine
app.set('view engine','ejs')

//path of views
app.set('views','./views');

//MongoStore is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    //change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)//100 minutes
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove: 'disable'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){

        //String Interpolation 
        console.log(`Error in running the server: ${err}`);
        return;
    }

    //server running successfully
    //string interpolation
    console.log(`Server is up and succesfully running on port: ${port}`);
    return;
});

