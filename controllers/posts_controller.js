const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            req.flash('error',err);
            return;
        }
        req.flash('success','Post Created!');
        return res.redirect('back');
    });
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
            req.flash('success','Post Deleted!');
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