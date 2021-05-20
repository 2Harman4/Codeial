const express = require('express');
//importing cookie parser
const cookieParser = require('cookie-parser');
//create server
const app = express();
//by default websites run on port:80
const port = 8000;
//importing database configuration
const db = require('./config/mongoose');

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

//use express router
app.use('/',require('./routes/index'));

//setting view engine
app.set('view engine','ejs')

//path of views
app.set('views','./views');

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

