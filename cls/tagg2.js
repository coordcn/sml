var __sml__runtime = require("runtime");
function __sml__class(){}

__sml__runtime.extend(__sml__class, require("./tagg1.js").getClass());

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

exports.getClass = function(){
  return __sml__class;
};

var __sml__instance = new __sml__class();
exports.render = function(data){
  return __sml__instance.render(data);
};