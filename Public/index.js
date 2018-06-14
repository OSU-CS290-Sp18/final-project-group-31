//Stick Figure Gaming client side javascript

//new post functionality for both threads and comments
//variable to indicate weather a new post form is open
var newPostFormActive = false;

//get the buttons
var newThreadButton = document.getElementsByClassName("new-thread-button")[0];
var replyButton = document.getElementsByClassName("reply-button")[0];

var post = function(event)
{
  //grab the text from the new post form fields
  var author = document.getElementsByClassName("author-input")[0].value;
  var subject = document.getElementsByClassName("subject-input")[0].value;
  var content = document.getElementsByClassName("post-input")[0].value;

  //if the values are too long, shorten them
  if(author.length > 20)
  {
    var shortAuthor = author.slice(0, 20) +  "...";
  }
  else
  {
      var shortAuthor = author;
  }

  if(subject.length > 75)
  {
    var shortSubject = subject.slice(0, 75) +  "...";
  }
  else
  {
      var shortSubject = subject;
  }

  if(content.length > 200)
  {
    var shortContent = content.slice(0, 200) +  "...";
  }
  else
  {
      var shortContent = content;
  }

  //if all fields are filled out proceed, otherwise alert the user
  if(author && subject && content)
  {
    if(event.currentTarget.id === "threadPostButton")
    {
      var data =
      {
        threadAuthor: shortAuthor,
        threadSubject: shortSubject,
        threadContent: shortContent,
        threadCommentCount: 0,
        threadViewCount: 0
      }

      var newCollapsedThread = Handlebars.templates.collapsedThread(data);

      var forumItemContainer = document.querySelector('.forum-item-holder');
      forumItemContainer.insertAdjacentHTML('beforeend', newCollapsedThread);
    }
    else if(event.currentTarget.id === "commentPostButton")
    {
      var data =
      {
        commentAuthor: shortAuthor,
        commentSubject: shortSubject,
        commentContent: content
      }

      var newComment = Handlebars.templates.comment(data);

      var forumItemContainer = document.querySelector('.forum-item-holder');
      forumItemContainer.insertAdjacentHTML('beforeend', newComment);
    }

    //call cancelPost to remove the new post form
    cancelPost();
  }
  else
  {
    alert("The author, subject, and content fields all must be filled out.");
  }
}

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
    //put the form at the start of the container if it is the newThreadButton
    if(newThreadButton) if(event.currentTarget.id === newThreadButton.id)
    {
      //indicate which source the post is for
      var type = {threadPost: true}

      //create new post form html
      var newPostForm = Handlebars.templates.newPost(type);

      var forumItemContainer = document.querySelector('.forum-item-holder');
      forumItemContainer.insertAdjacentHTML('afterbegin', newPostForm);
    }

    //put the form after the thread post if it is the replyButton
    if(replyButton) if(event.currentTarget.id === replyButton.id)
    {
      //indicate which source the post is for
      var type = {commentPost: true}

      //create new post form html
      var newPostForm = Handlebars.templates.newPost(type);

      var threadPost = document.querySelector('.forum-item-holder > #threadPost');
      threadPost.insertAdjacentHTML('afterend', newPostForm);
    }

    //add the cancelPost function to the cancel button
    var cancelButton = document.getElementsByClassName("cancel-button")[0];
    if(cancelButton) cancelButton.addEventListener("click", cancelPost);

    //add the post function to the post button
    var postButton = document.getElementsByClassName("post-button")[0];
    if(postButton) postButton.addEventListener("click", post);

    //indicate that there is a new post form open
    newPostFormActive = true;
  }
}

//add the open form function to the new thread button and reply button if they are on this page
if(newThreadButton) newThreadButton.addEventListener("click", openNewPostForm);
if(replyButton) replyButton.addEventListener("click", openNewPostForm);
