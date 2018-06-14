(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['collapsedThread'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"/forums/Stick-Figure-Clicker/123-this-is-a-thread\" class=\"forum-item\">\r\n  <h2 class=\"thread-subject\">"
    + alias4(((helper = (helper = helpers.threadSubject || (depth0 != null ? depth0.threadSubject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"threadSubject","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  <h3 class=\"thread-author\">"
    + alias4(((helper = (helper = helpers.threadAuthor || (depth0 != null ? depth0.threadAuthor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"threadAuthor","hash":{},"data":data}) : helper)))
    + "</h3>\r\n  <h3 class=\"thread-short-content\">"
    + alias4(((helper = (helper = helpers.threadContent || (depth0 != null ? depth0.threadContent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"threadContent","hash":{},"data":data}) : helper)))
    + "</h3>\r\n  <h3 class=\"thread-comments\">"
    + alias4(((helper = (helper = helpers.threadCommentCount || (depth0 != null ? depth0.threadCommentCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"threadCommentCount","hash":{},"data":data}) : helper)))
    + " comments</h3>\r\n  <h3 class=\"thread-views\">"
    + alias4(((helper = (helper = helpers.threadViewCount || (depth0 != null ? depth0.threadViewCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"threadViewCount","hash":{},"data":data}) : helper)))
    + " views</h3>\r\n</a>\r\n";
},"useData":true});
})();