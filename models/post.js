const mongoose = require('mongoose');

//creating schema for post
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user : { //linking to the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //saving all comment ids inside an array
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps:true 
});

//declaring it as a model in database- collection name Post
const Post = mongoose.model('Post',postSchema);
module.exports = Post;