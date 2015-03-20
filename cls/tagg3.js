var __sml__runtime = require("runtime");
function __sml__class(){}

__sml__runtime.extend(__sml__class, require("./tagg2.js").getClass());

__sml__class.prototype.blockforin = function(it){
  var __sml__out = "<div id='forin'>code test for in";
    var forin = it.forin;
    __sml__out += "<ul>";
      for(var name in forin){
        __sml__out += "<li>名称：" + ((name || typeof name === "boolean") ? name : "") + "   值：" + ((forin[name] || typeof forin[name] === "boolean") ? forin[name] : "") + "</li>";
      }
    __sml__out += "</ul></div>";
  return __sml__out;
};

exports.getClass = function(){
  return __sml__class;
};

var __sml__instance = new __sml__class();
exports.render = function(data){
  return __sml__instance.render(data);
};