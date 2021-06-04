const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require ('../models/user');

module.exports.create = async function(req,res){

    try{
        //need to validate the post in db
        let post = await Post.findById(req.body.post);
           
        //post is found
        //save comment in database
        let comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post
        });

        //comment saved
        //we need to put push the comment id to the Array of comment id's in the post itself
        post.comments.push(comment);
        post.save();//the update saved to db from ram

        //need to send comment with populated user name###############
        let populatedComment = await Comment.findById(comment.id).populate('user','name');

        console.log('Populated Comment is: ',populatedComment);

        //AJAX
        if(req.xhr){
            console.log("it is xhr");
            //return  response in JSON
            return res.status(200).json({
                data:{
                    comment : populatedComment
                },
                message: "Comment Created"
            });
        }

        console.log('some problem in controller');
        // req.flash('success','Comment posted!');
        // return res.redirect('/');
        
    }catch(err){
        req.flash('error',err);
        return;
    }
    
}


module.exports.destroy = async function(req,res){
    
    try{
        //verifying Comment in db
        let comment = await Comment.findById(req.params.id);

        //verifying if the person deleting comment is the one who created it or the owner of the post
        if(comment.user == req.user.id || post.user == req.user.id ){

            //pulling the comment from the comments array of the post
            let post = await Post.findByIdAndUpdate(comment.post,{ $pull: {comments:comment.id}});
   
            //delete comment
            comment.remove();

            //AJAX
            if(req.xhr){
                console.log('is xhr');
                //return response in JSON format
                return res.status(200).json({
                    data:{
                        comment_id: req.params.id
                    },
                    message: 'Comment deleted'
                })

            }
            req.flash('success','Comment Deleted!');
            return res.redirect('back');
                
        }else{
            req.flash('error','Unauthorised Action');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        return;
    }
    
    
    
    
    
    
    
}