const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    
    try{
   
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        let postPopulated = await Post.findById(post.id).populate({ path: 'user', select: { 'name':1,'avatar':1}});

        //checking if the request is sent by AJAX
        if (req.xhr){
            console.log("it is xhr");
            //return  response in JSON
            return res.status(200).json({
                data:{
                    post: postPopulated
                },
                message: "Post Created"
            });
        }


    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

}


module.exports.destroy = async function(req,res){

    try{

        //to prevent fidling with html by user
        //lets verify if the post exists in db
        let post = await Post.findById(req.params.id);

        //checking if the person trying to delete the post is same as the one who created it
        //.id is the string variant of ._id by mongoose
        if(post.user == req.user.id){
            
            post.remove();
            //deleting its comments from db
            await Comment.deleteMany({post: post.id});

            //checking if the request is sent by AJAX
            if(req.xhr){
        
                //return  response in JSON
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
            console.log('after return');
            // req.flash('success','Post Deleted!');
            // return res.redirect('back');
            
        }else{
            req.flash('error','Unauthorised Action');
            return res.redirect('back');
        }
        

    }catch(err){
        req.flash('error',err);
        return;
    }

}