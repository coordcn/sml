/** 
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview sml runtime
  @author QianYe(coordcn@163.com)
 */

// Reference: YUI
NATIVE_FN_REGEX  = /\{\s*\[(?:native code|function)\]\s*\}/i;
function isNative(fn){
  return fn && NATIVE_FN_REGEX.test(fn);
}

// Reference: YUI
var createObject = (isNative(Object.create)) ? function(proto){
  return Object.create(proto)
} : (function(){
  function F(){}
  
  return function(proto){
    F.prototype = proto;
    return new F();
  };
})();
 
exports.extend = function(child, parent){
  var c = child.prototype;

  child.prototype = createObject(parent.prototype);
  child.prototype.constructor = child;
  child.superclass = parent.prototype;
  child._super = function(){
    var self = Array.prototype.shift.call(arguments);
    parent.prototype.constructor.apply(self, arguments);
  };
  
  for(var n in c){
    child.prototype[n] = c[n];
  }
};

var escape_chars = {
  '&': '&#38;',
  '<': '&#60;',
  '>': '&#62;',
  '"': '&#34;',
  "'": '&#39;'
};
var escape_regexp = /&(?!\w+;)|<|>|"|\'/g;  
 
function escape_replace(m){
  return escape_chars[m];
}

exports.escape = function(content){
  if(typeof content !== 'string' || !(escape_regexp.test(content))) return content; 
  return content.replace(escape_regexp, escape_replace);
};

exports.rethrow = function(err, file, line, sml, js){
  if(!(err instanceof Error)) throw err;
  
  err.message = '\n\nfile: ' + file + '\n' +
                'line: ' + line + '\n' +
                'sml : ' + sml + '\n' +
                'js  : ' + js + '\n\n' + err.message;
  
  throw err;
};
