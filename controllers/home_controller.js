const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){


    try{

        let posts = await Post.find({})
        .sort({updatedAt:-1})
        .populate('user')// populating the user who made the post
        .populate({
            path: 'comments', //populating the comment
            populate: {
                path: 'user' //populating the user who made this comment
            }
        });
        
        //getting all the Users list
        let users = await User.find({});
    
        return res.render('home.ejs',{
            title: "Home",
            posts:posts,
            all_users: users
        });

    }catch(err){
        console.log("Error: ",err);
        return;
    }

   
}