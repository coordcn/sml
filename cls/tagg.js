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

__sml__class.prototype.blockif = function(it){
  var __sml__out = "<div id='if'>code test if";
    var ifcase = it.deep0.deep1.deep2.ifcase;
    var elseifcase0 = it[elseifcase0];
    var ifresult = it.ifresult;
    var elseifresult0 = it.elseifresult0;
    if(ifcase){
      __sml__out += "<p>" + ((ifresult || typeof ifresult === "boolean") ? ifresult : "") + " 我是if的结果这里再弄点文字什么的这其实还是一个测试</p><div>div也是可以的吧</div>";
    }
    else if(elseifcase0){
      __sml__out += "<p>这是一个转义的结果 " + ((elseifresult0 || typeof elseifresult0 === "boolean") ? __sml__runtime.escape(elseifresult0) : "") + " 我们来让结果转个义</p>";
    }
    else if(it.elseifcase1){
      __sml__out += "<p>这是是没有转义的结果 " + ((elseifresult0 || typeof elseifresult0 === "boolean") ? elseifresult0 : "") + " 我们来不让结果转个义</p>";
    }
    else{
      __sml__out += "<p>终于到else 请大家注意，javascript语法的正确性保证要靠自己，所有语句将原封不动的替换到编译后的函数中去</p>";
    }
  __sml__out += "</div>";
  return __sml__out;
};

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