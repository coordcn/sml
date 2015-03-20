var __sml__runtime = require("runtime");
function __sml__class(){}
__sml__class.prototype.render = function(it){
  it = it || {};
  var __sml__out = "<!DOCTYPE html><html><head>" + this.blocktitile(it) + "<meta charset='utf-8'></head><body><div>test" + this.blockcontent1(it) + "</div></body></html>";
  return __sml__out;
};
__sml__class.prototype.blocktitile = function(it){
  var __sml__out = "<titile>titile</titile><titile>titile1<a>a1<a>a2" + this.blockt1(it) + "</a>" + this.blockt2(it) + "</a>" + this.blockt3(it) + "</titile>";
  return __sml__out;
};
__sml__class.prototype.blockt1 = function(it){
  return "";
};
__sml__class.prototype.blockt2 = function(it){
  return "";
};
__sml__class.prototype.blockt3 = function(it){
  return "";
};
__sml__class.prototype.blockcontent1 = function(it){
  var __sml__out = "<div>test1</div>" + this.blockcontent2(it) + "<div>test2" + this.blockcontent3(it) + "</div>";
  return __sml__out;
};
__sml__class.prototype.blockcontent2 = function(it){
  return "";
};
__sml__class.prototype.blockcontent3 = function(it){
  var __sml__out = "<div>test3<div>test33</div>" + this.blockcontent4(it) + this.blockcontent5(it) + "</div>";
  return __sml__out;
};
__sml__class.prototype.blockcontent4 = function(it){
  return "";
};
__sml__class.prototype.blockcontent5 = function(it){
  var __sml__out = "<div>test5<div>test55" + this.blockcontent6(it) + "</div></div>";
  return __sml__out;
};
__sml__class.prototype.blockcontent6 = function(it){
  return "";
};
exports.getClass = function(){
  return __sml__class;
};
var __sml__instance = new __sml__class();
exports.render = function(data){
  return __sml__instance.render(data);
};