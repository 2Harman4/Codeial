const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //need to validate the post in db
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log("error in finding the post in database");
            return res.redirect('/');
        }else{
            //post is found
            //save comment in database
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            },function(err,comment){
                if(err){
                    console.log("Eror in saving comment to database"); 
                    return res.redirect('/');
                }
                //comment saved
                //we need to put push the comment id to the Array of comment id's in the post itself
                post.comments.push(comment);
                post.save();//the update saved to db from ram

                return res.redirect('/');
            });
        }
    });
}