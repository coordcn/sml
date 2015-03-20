var runtime = require('./runtime');
var news_class = require('./news');

var news_instance = new news_class();

exports.news = function(it){
  return news_instance.render(it, runtime);
}

exports.getClass = function(){
};

exports.getInstance = function(){
}

var sml = require('sml');
var news = require('./news').getInstance();
sml.render(instance, data);