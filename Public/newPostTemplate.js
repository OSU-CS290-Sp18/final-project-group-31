(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newPost'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"post-button button\" id=\"threadPostButton\" type=\"button\">Post Thread</button>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"post-button button\" id=\"commentPostButton\" type=\"button\">Post Reply</button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"forum-item\" id=newPostForm>\r\n  <h2 class=\"author-label\">Author:</h2>\r\n  <input class=\"author-input\" type=\"text\">\r\n  <h2 class=\"subject-label\">Subject:</h2>\r\n  <input class=\"subject-input\" type=\"text\">\r\n  <textarea class=\"post-input\"></textarea>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.threadPost : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.commentPost : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <button class=\"cancel-button button\" type=\"button\">Cancel</button>\r\n</div>\r\n";
},"useData":true});
})();