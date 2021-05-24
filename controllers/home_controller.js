module.exports.home = function(req,res){
    //lets see the cookie
    console.log('****COOKIE: ',req.cookies);

    return res.render('home.ejs',{
        title: "Home"
    });
}