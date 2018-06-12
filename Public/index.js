//Stick Figure Gaming client side javascript

//user functionality
var user = "";

var userLogin = function()
{
  //get the username
  var usertextbox = document.getElementById("username-input");
  //get the user box
  var userbox = document.getElementsByClassName("user-box")[0];
  //get the user display
  var userdisplay = document.getElementsByClassName("user-display")[0];
  //get the username
  var username = document.getElementById("username");

  //if there is no username entered do an alert
  if(usertextbox.value === "")
  {
    alert("No username entered, please enter a username.");
  }
  else
  {
    //set the user text to the site-wide user
    user = usertextbox.value;
    //clear the username text input
    usertextbox.value = "";

    //create a textnode for the username and set it to the user display
    username.appendChild(document.createTextNode(user));

    //swap the login box for the user display
    userbox.classList.add("hidden");
    userdisplay.classList.remove("hidden");
  }
}

var loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", userLogin);


//add functionality to open the menu
var menuIsOpen = false;
var menuToggle = function()
{
  //grab the relevent elements
  var menu = document.getElementsByClassName("side-menu")[0];
  var header = document.getElementsByClassName("site-header")[0];
  var navbar = document.getElementsByClassName("navbar")[0];

  //opens the menu if it is closed, closes the menu if it is open
  if(menuIsOpen)
  {
    menu.classList.add("hidden");
    navbar.classList.remove("menu-is-open");
    header.classList.remove("menu-is-open");
    menuIsOpen = false;
  }
  else
  {
    menu.classList.remove("hidden");
    navbar.classList.add("menu-is-open");
    header.classList.add("menu-is-open");
    menuIsOpen = true;
  }
}

var menuButton = document.getElementById("menu-open-button");
menuButton.addEventListener("click", menuToggle);
