var __sml__runtime = require("runtime");
function __sml__class(){}

__sml__runtime.extend(__sml__class, require("./tagg3.js").getClass());

__sml__class.prototype.blockswitch = function(it){
  var __sml__out = "<div id='switch'>code test switch";
    switch(it.switch){
      case 0:
      case 1:
      case 3:
        __sml__out += "<p>这里是switch测试 0 1 3</p>";
        break;
      default:
        __sml__out += "<p>这里是switch测试 default</p>";
        break;
    }
  __sml__out += "</div>";
  return __sml__out;
};

exports.getClass = function(){
  return __sml__class;
};

var __sml__instance = new __sml__class();
exports.render = function(data){
  return __sml__instance.render(data);
};