const Post = require('../models/post');

module.exports.home = function(req,res){
    
    

    Post.find({}).sort({updatedAt:-1})
    .populate('user')// populating the user who made the post
    .populate({
        path: 'comments', //populating the comment
        populate: {
            path: 'user' //populating the user who made this comment
        }
    })
    .exec(function(err,posts){

        if(err){
            console.log("error in fetching posts");
            return res.redirect('//users/sign-up');
        }
        return res.render('home.ejs',{
            title: "Home",
            //left posts is fetched from db
            //right posts is locals.posts
            posts:posts
        });
    });
}