{   
    // import{ createComment , deleteComment } from './home_comments';
    //  const createHome = require('./home_comments');
    
    //method to submit Form data for new post using AJAX
    let createPost =function(req,res){

        const newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            //prevents submission via form
            e.preventDefault();
            e.stopPropagation();
            
            $.ajax({
                type: 'post',
                url: "/posts/create",
                //serealize converts form data to JSON (key-value)
                data: newPostForm.serialize(),
                success: function(data){

                    console.log(data);

                    //forming DOM code to prepend in the ul
                    let newPost = newPostDom(data.data.post);

                    $('#unordered-list-container').prepend(newPost);

                    //clearing the textarea after input
                    $('#new-post-form-textarea').val('');

                    //setting newly created post for delete functionality
                    deletePost();

                    //setting newly created post for toggleComment functionality
                    document.querySelector('#unordered-list-container .react-comment').addEventListener( 'click',function(e){
            
                        let commentButton = $(this);
                        // comments will be visible when comment button is clicked
                        let postComments =commentButton.parent().parent().children('.post-comments');
                        postComments.toggleClass('hidden-comments');
                    });

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // noty
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    //method to Create a post in DOM
    let newPostDom = function(post){
        return $(`<li class="post-container post-item" id="post-${post._id}">

        <div class="the-post">
            <div class="post-creator">
                <div class="creator-details">
                    <div class="creator-dp">
                        <span class="material-icons-outlined">
                            face
                            </span>
                    </div>
    
                    <div class="name-and-when">
                        ${post.user.name}
    
                        <div class="post-when">
                            <!-- <%= post.updatedAt %> -->
                            on 30 May 2021
                        </div> 
    
                    </div>
                    
                </div>
    
                <div class="delete-button-container">
                    <a href="/posts/destroy/${post._id}" class="delete-post-button">
                        <span class="material-icons-outlined ">
                            delete
                        </span>
                    </a>     
                </div>
            </div>
    
            
            <div class="post-content">
                <p>
                    ${post.content}
                </p>
            </div>
    
        </div>
    
        <!-- this part contains post comment button for now, like will be added later  -->
        <div class="post-reacts">
            <div class="react-comment">
                <span class="material-icons-outlined">
                    chat_bubble_outline
                </span>
                &nbsp;Comment
            </div>
        </div>
    
        <!-- comment section -->
        <div class="post-comments hidden-comments">
            
            <div class="comment-maker">

                <div class="creator-dp">
                    <span class="material-icons-outlined">
                        face
                    </span>
                </div>

                <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST" autocomplete="off" class="create-comment-form">
                    <input type="text" name="content" placeholder="Type Here to Add Comment" class="comment-input-box" required>
                    <input type="hidden" name="post" value="${post._id}">    
                </form> 
            </div>
    
            <!-- display comments -->
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
    
        </div>
        
    
    </li>`)

    }
    
    // coding ninjas method
    // //method to  delete a newly created post from DOM
    // let deletePost = function (deleteLink){

    //     $(deleteLink).click(function(e){
    //         e.preventDefault();
            
    //         //later do it AJAX type DELETE
    //         $.ajax({
    //             type:'get',
    //             url: $(deleteLink).prop('href'),
    //             success: function(data){
    //                 console.log(data);
    //                 $(`#post-${data.data.post_id}`).remove();
                    
    //             }, error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         });
    //     });
    // }

// method to delete a post from DOM
   
    let deletePost = function (){

        $('.delete-post-button').click(function(e){
            e.preventDefault();
            e.stopPropagation();

            let deleteButton = $(this);
            
            //later do it AJAX type DELETE
            $.ajax({
                method:'get',
                url: deleteButton.prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // ======== TOGGLES THE COMMENT SECTION=======================

    

    let toggleComments = function(){
        
        let togglers =  $(".react-comment");
        console.log("togglers:",togglers);
     
       
        togglers.click(function(e){
            e.stopPropagation();
            
            let commentButton = $(this);
            // comments will be visible when comment button is clicked
            let postComments =commentButton.parent().parent().children('.post-comments');
            postComments.toggleClass('hidden-comments');
        });
        
    }


     // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('.post-item').each(function(){
            let self = $(this);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }


    //function calls
    createPost();
    deletePost();
    toggleComments();
    convertPostsToAjax();

}