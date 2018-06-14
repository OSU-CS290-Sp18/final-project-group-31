(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newPost'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"forum-item\" id=newPostForm>\r\n  <h2 class=\"author-label\">Author:</h2>\r\n  <input class=\"author-input\" type=\"text\">\r\n  <h2 class=\"subject-label\">Subject:</h2>\r\n  <input class=\"subject-input\" type=\"text\">\r\n  <textarea class=\"post-input\"></textarea>\r\n  <button class=\"post-button button\" type=\"button\">Post Reply</button>\r\n  <button class=\"cancel-button button\" type=\"button\">Cancel</button>\r\n</div>\r\n";
},"useData":true});
})();