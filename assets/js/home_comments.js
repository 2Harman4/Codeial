//CN Method

// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){

                    console.log('back in ajax comment:',data.data);
                    let newComment;
                    // if avatar is present
                    if(data.data.comment.user.avatar){

                        newComment = pSelf.newCommentDomAvatar(data.data.comment);

                    }else {
                        //avatar not present
                        newComment = pSelf.newCommentDom(data.data.comment);
                    }
                    
                    $(`#post-comments-${postId}`).append(newComment);
                    pSelf.deleteComment($(' .delete-comment-button'));

                    $('.comment-input-box').val("");

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
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

    //method to create a Comment in Dom when  Avatar is not present
    newCommentDom(comment){
        return (`<li class="comment-list-element" id="comment-${comment._id}">  

                <div class="the-comment">
                    
                    <div class="commentor-dp">
                            <img src="/images/unknown.jpg" alt="${comment.user.name }">
                    </div>
            
                    <div class="comment-content">
                        <div class="commentor-name">
                            ${ comment.user.name }
                        </div>
            
                        <div class="comment-content">
                        ${ comment.content }
                        </div>
                    </div>
                    
            
                </div>
                
            
                <!-- delete button only visible to the creater of the comment and the creater of post -->
                <div class="delete-button-container">
                        
                    <a href="/comments/destroy/${ comment._id }" class="delete-comment-button">
                        <span class="material-icons-outlined ">
                            delete
                        </span>
                    </a>
 
                </div>
            
            </li>`
        );
    }

    //method to create a Comment in Dom when  Avatar is  present
    newCommentDomAvatar(comment){
        return (`<li class="comment-list-element" id="comment-${comment._id}">  

                <div class="the-comment">
                    
                    <div class="commentor-dp">
                        <img src="${comment.user.avatar }" alt="${ comment.user.name }">
                      
                    </div>
            
                    <div class="comment-content">
                        <div class="commentor-name">
                            ${ comment.user.name }
                        </div>
            
                        <div class="comment-content">
                        ${ comment.content }
                        </div>
                    </div>
                    
            
                </div>
                
            
                <!-- delete button only visible to the creater of the comment and the creater of post -->
                <div class="delete-button-container">
                        
                    <a href="/comments/destroy/${ comment._id }" class="delete-comment-button">
                        <span class="material-icons-outlined ">
                            delete
                        </span>
                    </a>
 
                </div>
            
            </li>`
        );
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

}




// my method...............

// $(document).ready(function () {
    

//     //method to create comment via ajax
//     let createComment = function(req,res){
//         let createCommentForms = $('.create-comment-form');

//         createCommentForms.submit(function(e){
//             //prevents submission via form
//             e.preventDefault()

//             //the submitted form
//             let createCommentForm = $(this);

//             $.ajax({
//                 type: 'post',
//                 url: "/comments/create",
//                 //serealize converts form data to JSON (key-value)
//                 data: createCommentForm.serialize(),
//                 success: function(data){

//                     console.log(data);

//                     //construct DOM code
//                     let newComment = newCommentDom(data.data.comment);
//                     // prepend the DOM code
//                     createCommentForm.parent().parent().parent().find('.comments-ul').append(newComment);

//                     //clearing the commentbox after input
//                     $('.comment-input-box').val('');

//                     // noty
//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment posted!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();

//                     //enabling newly added comment for delete functionality
//                     deleteComment();
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }
    
//     //method to create a Comment in Dom
//     let newCommentDom = function(comment){
//         return (`<li class="comment-list-element" id="comment-${ comment._id}">  

//                 <div class="the-comment">
                    
//                     <div class="commentor-dp">
//                         <span class="material-icons-outlined">
//                             face
//                             </span>
//                     </div>
            
//                     <div class="comment-content">
//                         <div class="commentor-name">
//                             ${ comment.user.name }
//                         </div>
            
//                         <div class="comment-content">
//                         ${ comment.content }
//                         </div>
//                     </div>
                    
            
//                 </div>
                
            
//                 <!-- delete button only visible to the creater of the comment and the creater of post -->
//                 <div class="delete-button-container">
                        
//                     <a href="/comments/destroy/${ comment._id }" class="delete-comment-button">
//                         <span class="material-icons-outlined ">
//                             delete
//                         </span>
//                     </a>
 
//                 </div>
            
//             </li>`
//         );
//     }

//     //method to delete a comment 
    
//     let deleteComment = function (){

//         $('.delete-comment-button').click(function(e){
//             e.preventDefault();

//             let deleteButton = $(this);
            
//             //later do it AJAX type DELETE
//             $.ajax({
//                 method:'get',
//                 url: deleteButton.prop('href'),
//                 success: function(data){
//                     console.log(data);
//                     $(`#comment-${data.data.comment_id}`).remove();
                    
//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment Deleted",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();

//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }


//     //function calls
//     createComment();
//     deleteComment();
    
//     //exporting functions
//     // export{ createComment , deleteComment };
    

// });