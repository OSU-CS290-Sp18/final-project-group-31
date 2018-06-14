//code to remove the new post form from the DOM without posting it
var cancelButton = document.getElementsByClassName("cancel-button")[0];
if(cancelButton) cancelButton.addEventListener("click", function()
{
  //remove the post form
  var newPostForm = document.getElementById("newPostForm");
  newPostForm.remove();
  //indicate that there is no post form open
  newPostFormActive = false;
  //remove this script
  document.getElementsByClassName("/cancelPost.js")[0].remove()
});
