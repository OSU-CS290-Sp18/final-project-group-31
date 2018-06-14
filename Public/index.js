//Stick Figure Gaming client side javascript

//new post functionality for both threads and comments
//variable to indicate weather a new post form is open
var newPostFormActive = false;

//get the buttons
var newThreadButton = document.getElementsByClassName("new-thread-button")[0];
var replyButton = document.getElementsByClassName("reply-button")[0];

//function to get a short version of the author, subject, and content
var shortenContent = function(author, subject, content)
{
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

  if(content.length > 140)
  {
    var shortContent = content.slice(0, 140) +  "...";
  }
  else
  {
      var shortContent = content;
  }

  var result =
  {
    shortAuthor: shortAuthor,
    shortSubject: shortSubject,
    shortContent: shortContent
  };

  return result;
}

//function to pack the post content for a thread
var packThreadContent = function(author, subject, content)
{
  //get the short version of content variables
  var short = shortenContent(author, subject, content);

  //create the url for the new thread
  var threadId = Math.floor(Math.random() * 1000) + "-" + subject.replace(" ", "-");
  var url = window.location.pathname + "/" + threadId;

  var result =
  {
    author: author,
    subject: subject,
    content: content,
    shortAuthor: short.shortAuthor,
    shortSubject: short.shortSubject,
    shortContent: short.shortContent,
    threadId: threadId,
    url: url
  };

  return result;
}

var packCommentContent = function(author, subject, content)
{
  //get the short version of content variables
  var short = shortenContent(author, subject, content);

  var result =
  {
    author: author,
    subject: subject,
    content: content,
    shortAuthor: short.shortAuthor,
    shortSubject: short.shortSubject,
    shortContent: short.shortContent,
  };

  return result;
}

//function to post a thread or comment
var post = function(event)
{
  //grab the text from the new post form fields
  var author = document.getElementsByClassName("author-input")[0].value;
  var subject = document.getElementsByClassName("subject-input")[0].value;
  var content = document.getElementsByClassName("post-input")[0].value;



  //if all fields are filled out proceed, otherwise alert the user
  if(author && subject && content)
  {
    if(event.currentTarget.id === "threadPostButton")
    {
      //pack the content
      var data = packThreadContent(author, subject, content);

      //create a post to the server
      var request = new XMLHttpRequest();

      //create the post pathname and body
      var requestURL = window.location.pathname + '/newThread';
      var requestBody = JSON.stringify(data);

      //start the post
      request.open("POST", requestURL);
      request.setRequestHeader('Content-Type', 'application/json');

      //create the post callback function for when it completes
      request.addEventListener('load', function (event)
      {
        if (event.target.status !== 200)
        {
          var message = event.target.response;
          alert("Error creating thread: " + message);
        }
        else
        {
          //go to the new thread url
          //LOOKATME! Note: add this after db is in place
        }
      });

      //send the post request
      request.send(requestBody);

      //create a new collapsed thread (going to remove this later)
      var newCollapsedThread = Handlebars.templates.collapsedThread(data);
      var forumItemContainer = document.querySelector('.forum-item-holder');
      forumItemContainer.insertAdjacentHTML('beforeend', newCollapsedThread);
    }
    //send comment post
    else if(event.currentTarget.id === "commentPostButton")
    {
      //pack the content
      var data = packCommentContent(author, subject, content);

      //create a post to the server
      var request = new XMLHttpRequest();

      //create the post pathname and body
      var requestURL = window.location.pathname + '/newComment';
      var requestBody = JSON.stringify(data);

      //start the post
      request.open("POST", requestURL);
      request.setRequestHeader('Content-Type', 'application/json');

      //create the post callback function for when it completes
      request.addEventListener('load', function (event)
      {
        if (event.target.status !== 200)
        {
          var message = event.target.response;
          alert("Error creating thread: " + message);
        }
        else
        {
          //go to the new thread url
          //LOOKATME! Note: add this after db is in place
        }
      });

      //send the post request
      request.send(requestBody);

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
