const Post = require('../models/post');
const User = require('../models/user');

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

        //getting all the Users list
        User.find({},function(err,users){

            return res.render('home.ejs',{
                title: "Home",
                posts:posts,
                all_users: users
            });
        
        });
    });
}