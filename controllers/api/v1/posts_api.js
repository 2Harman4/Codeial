const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    
    //getting all the posts from db
    let posts = await Post.find({})
    .sort({updatedAt:-1})
    .populate('user')// populating the user who made the post
    .populate({
        path: 'comments', //populating the comment
        populate: {
            path: 'user', //populating the user who made this comment
            select: 'name avatar email'
        }
    });
    
    return res.json(200,{
        message:"Lists of post",
        posts: posts
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

            return res.json(200,{
                message: 'post and assocaiated comments deleted successfully'
            });
        }else{
            return res.json(401 ,{
                message: "you cannot delete this post"
                
            });
        }

    }catch(err){
        console.log('**********',err);
        return res.json(500, {
            message: 'internal server error'
        });
    }

}