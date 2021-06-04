
$(document).ready(function () {
    

    //method to create comment via ajax
    let createComment = function(req,res){
        let createCommentForms = $('.create-comment-form');

        createCommentForms.submit(function(e){
            //prevents submission via form
            e.preventDefault()

            //the submitted form
            let createCommentForm = $(this);

            $.ajax({
                type: 'post',
                url: "/comments/create",
                //serealize converts form data to JSON (key-value)
                data: createCommentForm.serialize(),
                success: function(data){

                    console.log(data);

                    //construct DOM code
                    let newComment = newCommentDom(data.data.comment);
                    // prepend the DOM code
                    createCommentForm.parent().parent().parent().find('.comments-ul').append(newComment);

                    //clearing the commentbox after input
                    $('.comment-input-box').val('');

                    // noty
                    new Noty({
                        theme: 'relax',
                        text: "Comment posted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                    //enabling newly added comment for delete functionality
                    deleteComment();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    
    //method to create a Comment in Dom
    let newCommentDom = function(comment){
        return (`<li class="comment-list-element" id="comment-${ comment._id}">  

                <div class="the-comment">
                    
                    <div class="commentor-dp">
                        <span class="material-icons-outlined">
                            face
                            </span>
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

    //method to delete a comment 
    
    let deleteComment = function (){

        $('.delete-comment-button').click(function(e){
            e.preventDefault();

            let deleteButton = $(this);
            
            //later do it AJAX type DELETE
            $.ajax({
                method:'get',
                url: deleteButton.prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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


    //function calls
    createComment();
    deleteComment();
    
    //exporting functions
    // export{ createComment , deleteComment };
    

});