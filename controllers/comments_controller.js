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


module.exports.destroy = function(req,res){
    //verifying Comment in db
    Comment.findById(req.params.id,function(err,comment){
        //verifying if the person deleting comment is the one who created it or the owner of the post
        if(comment.user == req.user.id || post.user == req.user.id ){
            //pulling the comment from the comments array of the post
            Post.findByIdAndUpdate(comment.post,{ $pull: {comments:comment.id}}, function(err,post){
                if(err){
                    console.log("error ");
                    return res.redirect('back');
                }else{
                    //delete comment
                    comment.remove();
                    return res.redirect('back');
                }
            });
        }else{
            return res.redirect('back');
        }
      })
}