//new post functionality for both threads and comments
//variable to indicate weather a new post form is open
var newPostFormActive = false;

//get the buttons
var newThreadButton = document.getElementsByClassName("new-thread-button")[0];
var replyButton = document.getElementsByClassName("reply-button")[0];


//function to open a new post form
var openNewPostForm = function(event)
{
  console.log(event.currentTarget);
  //only open a form if there isn't one already
  if(!newPostFormActive)
  {
    //create new post form html
    var newPostForm = Handlebars.templates.newPost();

    //put the form at the start of the container if it is the newThreadButton
    if(newThreadButton) if(event.currentTarget.id === newThreadButton.id)
    {
      var forumItemContainer = document.querySelector('.forum-item-holder');
      forumItemContainer.insertAdjacentHTML('afterbegin', newPostForm);
    }

    //put the form after the thread post if it is the replyButton
    if(replyButton) if(event.currentTarget.id === replyButton.id)
    {
      var threadPost = document.querySelector('.forum-item-holder > #threadPost');
      threadPost.insertAdjacentHTML('afterend', newPostForm);
    }

    //add js for buttons in the form
    addjs("/cancelPost.js");

    //indicate that there is a new post form open
    newPostFormActive = true;
  }
}

//add the open form function to the new thread button and reply button if they are on this page
if(newThreadButton) newThreadButton.addEventListener("click", openNewPostForm);
if(replyButton) replyButton.addEventListener("click", openNewPostForm);
