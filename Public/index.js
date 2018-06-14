//Stick Figure Gaming client side javascript

//function to dynamically add javascript
var addjs = function(filepath)
{
  var newScript = document.createElement("script");
  newScript.setAttribute("src", filepath);
  newScript.classList.add(filepath);
  document.getElementsByTagName("head")[0].appendChild(newScript);
}
