"# final-project-group-31"
Stick Figure Gaming is a website designed to host html5/javascript games with a forum to go along with the games.
No games have been created for the website yet because I spent all my time making the forum.
The search bar also did not get its functionality implemented.

The forum is structured so that inside the MongoDB there is a category in the forum for each game, and one for general discussion.
Each category has an icon, a name, a description, and an array of sub-documents holding the threads that belong to the category.
  On the category page it lists the threads with their author, subject, and content. If any of these are too long for the display they get shortened.
  There is also an add thread button, which creates a form on the page for you to add a thread by entering an author, subject, and text content.
    The cancel button removes the form from the DOM, as it had been originally. The post button posts the thread to the server and redirects to the newly created thread page, populated by the db.
    Threads will also display the number of comments on them, and the number of times they have been viewed.

The thread page displays the full thread text and has a button to reply to the thread with a comment.
    Hitting the comment button creates a new comment form, the same as the thread form, with the same outward functionality as the thread form buttons.
    When a comment is created it appears at the bottom of the comment list. Comments can not be replied to.
    Additionally, the comment counter will get incremented when a comment is added, although currently you have to reload the page to see it update.
    The view counter gets updated whenever a thread is viewed.

Each of these pages is served dynamically with express and express-handlebars, along with MangoDB to store data and populate the pages.
The client side javascript updates the page as needed and uses post http requests to submit user inputted data to the server, where it subsequently goes to the MongoDB.
