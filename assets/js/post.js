$(document).ready(function () {
    const reactCommentButtons = $('.react-comment');

    reactCommentButtons.on('click',function(){
        
        let commentButton = $(this);
        // comments will be visible when comment button is clicked
        let postComments =commentButton.parent().parent().children('.post-comments');
        postComments.toggleClass('hidden-comments');
    });

});