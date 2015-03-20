var __sml__runtime = require('runtime');
function __sml__class(){}
__sml__runtime.extend(__sml__class, require().getClass());
__sml__class.prototype.blockname = function(it){
};
__sml__class.prototype.render = function(it){
  it = it || {};
  
  out this.blockname(it);
  
  return out;
};
exports.getClass = function(){
  return __sml__class;
};
var __sml__instance = new __sml__class();
exports.render = function(data){
  return __sml__instance.render(data);
};

    // iterate it.arr i 遍历宏 主要防止传入参数不存在出现程序错误
    if(iterator = /^- *iterate +([a-zA-Z_$][\w\.$]*) +([a-zA-Z_$][\w\.$]*)) */.exe(content)){
      var obj = iterator[1];
      var key = iterator[2];
      var buf = [
        'if(' + obj + '){',
        '  if(typeof ' + obj + '.length === "number"){',
        '    if(' + obj + '.length){',
        '      for(var ){',
        '      }',
        '    }',
        '  }else{',
        '  }'
        '}',
      ];
    }
    
- block name
  !a(id="name" class="cls") test
    !span(class="span") testest
!div(id="test")