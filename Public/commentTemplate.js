(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"forum-item\">\r\n  <h2 class=\"thread-subject\">"
    + alias4(((helper = (helper = helpers.commentSubject || (depth0 != null ? depth0.commentSubject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"commentSubject","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  <h3 class=\"thread-author\">"
    + alias4(((helper = (helper = helpers.commentAuthor || (depth0 != null ? depth0.commentAuthor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"commentAuthor","hash":{},"data":data}) : helper)))
    + "</h3>\r\n  <h3 class=\"thread-text\">"
    + alias4(((helper = (helper = helpers.commentContent || (depth0 != null ? depth0.commentContent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"commentContent","hash":{},"data":data}) : helper)))
    + "</h3>\r\n  <div class=\"filler\"></div>\r\n</div>\r\n";
},"useData":true});
})();