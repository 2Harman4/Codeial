const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("error in creating the post");
            return;
        }

        return res.redirect('back');
    });
}


module.exports.destroy = function(req,res){
    //to prevent fidling with html by user
    //lets verify if the post exists in db
    Post.findById(req.params.id,function(err,post){

        //checking if the person trying to delete the post is same as the one who created it
        //.id is the string variant of ._id by mongoose
        if(post.user == req.user.id){
            post.remove();

            //deleting its comments from db
            Comment.deleteMany({post: post.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}