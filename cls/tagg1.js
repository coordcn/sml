var __sml__runtime = require("runtime");
function __sml__class(){}

__sml__runtime.extend(__sml__class, require("./tag.js").getClass());

__sml__class.prototype.blockfor = function(it){
  var __sml__out = "<div id='id' class='cls'>Code test for";
    var users = it.users;
    if(users && users.length){
      __sml__out += "<table>";
        for(var i = 0, l = users.length; i < l; i++){
          var user = users[i];
          __sml__out += "<tr><td>名字：" + ((user.name || typeof user.name === "boolean") ? user.name : "") + "！这是一名神奇的少年！这其实是一个测试</td><td>年龄：" + ((user.age || typeof user.age === "boolean") ? user.age : "") + "！这是一名神奇的少年！这其实是一个测试中国的惊叹号和外国的是不一样的。</td></tr>";
        }
      __sml__out += "</table>";
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