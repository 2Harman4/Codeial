module.exports.home = function(req,res){
    //lets see the cookie
    console.log('****COOKIE: ',req.cookies);
    //changing value of a cookie
    res.cookie('user_id',95);

    return res.render('home.ejs',{
        title: "Home"
    });
}