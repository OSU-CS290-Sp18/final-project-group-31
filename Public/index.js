//Stick Figure Gaming client side javascript

//function to dynamically add javascript
var addjs = function(filepath)
{
  var newScript = document.createElement("script");
  newScript.setAttribute("src", filepath);
  newScript.classList.add(filepath);
  document.getElementsByTagName("head")[0].appendChild(newScript);
}

//new post functionality for both threads and comments
//variable to indicate weather a new post form is open
var newPostFormActive = false;

//get the buttons
var newThreadButton = document.getElementsByClassName("new-thread-button")[0];
var replyButton = document.getElementsByClassName("reply-button")[0];


//cancel button function
var cancelPost = function()
{
  //remove the post form
  var newPostForm = document.getElementById("newPostForm");
  newPostForm.remove();
  //indicate that there is no post form open
  newPostFormActive = false;
};

//function to open a new post form
var openNewPostForm = function(event)
{
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

    var cancelButton = document.getElementsByClassName("cancel-button")[0];
    if(cancelButton) cancelButton.addEventListener("click", cancelPost);

    //indicate that there is a new post form open
    newPostFormActive = true;
  }
}

//add the open form function to the new thread button and reply button if they are on this page
if(newThreadButton) newThreadButton.addEventListener("click", openNewPostForm);
if(replyButton) replyButton.addEventListener("click", openNewPostForm);
