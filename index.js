const express = require('express');
//create server
const app = express();
//by default websites run on port:80
const port = 8000;

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

