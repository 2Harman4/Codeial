module.exports.profile = function(req,res){
    res.render('home.ejs',{
        title: 'Users/Profile'
    });
}