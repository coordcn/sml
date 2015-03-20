/** 
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview Simple Markup Language
  @author QianYe(coordcn@163.com)
  @reference http://www.haml.info/
             http://jade-lang.com/
             http://www.jsonml.org/
 */

var rt = require('./runtime');
var fs = require('fs');
 
var selfCloseTags = {
  'link': 1,
  'meta': 1,
  'img': 1,
  'input': 1,
  'base': 1,
  'hr': 1,
  'br': 1,
  'wbr': 1,
  'embed': 1,
  'param': 1,
  'source': 1,
  'track': 1,
  'area': 1,
  'option': 1
};

var NODE_TYPE = {
  Error: 0,     // error
  Text: 1,      // doctype tag text
  Code: 2,      // code
  Include: 3,   // include path
  Extends: 4,   // extends path
  Block: 5      // block name
};

var Compiler = module.exports = function(str, filename){
  this.lines = str.replace(/^\uFEFF/, '')
                  .replace(/\r\n|\r/g, '\n')
                  .replace(/\t/g, '  ')
                  .split('\n');
                
  this.filename = filename;
  this.index = 0;
  this.stack = [];
  this.nodes = [];
  this.blocks = {};
  this.current = [];
  this.current.unshift(this.nodes);
  this.extend = null;
}

var header = [
  'var __sml__runtime = require("runtime");',
  'function __sml__class(){}'
];

var footer = [
  'exports.getClass = function(){',
  '  return __sml__class;',
  '};\n',
  'var __sml__instance = new __sml__class();',
  'exports.render = function(data){',
  '  return __sml__instance.render(data);',
  '};'
];

Compiler.prototype.compile = function(options){
  var out = header.join('\n') + '\n\n';
  var temp = '';
  
  if(this.extend){
    out += this.extend.js + '\n\n';
  }else{
    temp = compile(this.nodes);
    if(temp){
      out += '__sml__class.prototype.render = function(it){\n';
      out += '  it = it || {};\n';
      out += temp + '";\n';
      out += '  return __sml__out;\n';
      out += '};\n\n';
    }else{
      out += '__sml__class.prototype.render = function(it){\n';
      out += '  return "";\n';
      out += '};\n\n';
    }
  }
    
  for(var name in this.blocks){
    temp = compile(this.blocks[name]);
    if(temp){
      out += '__sml__class.prototype.block' + name + ' = function(it){\n';
      out += temp + '";\n';
      out += '  return __sml__out;\n';
      out += '};\n\n';
    }else{
      out += '__sml__class.prototype.block' + name + ' = function(it){\n';
      out += '  return "";\n';
      out += '};\n\n';
    }
  }
  
  out += footer.join('\n');
  
  return out.replace(/\"\" \+ /g, '');
}

function compile(arr){
  var out = '';
  if(!arr.length) return out;
  
  var flag = false; // fasle: var __sml__out=" true: __sml__out+="
  
  var first = arr[0];
  var firstIndentLength = first.indent.length;
  if(first.type == NODE_TYPE.Code){
    out += '  ' + first.js;
  }else{
    out += '  ' + 'var __sml__out = "' + first.js;
    flag = true;
  }

  for(var i = 1, l = arr.length; i < l; i++){
    var prev = arr[i - 1];
    var current = arr[i];
    var space = current.indent.slice(0, current.indent.length - firstIndentLength) + '  ';

    if(current.type == NODE_TYPE.Code){ // code
      if(prev.type == NODE_TYPE.Code){
        out += space + current.js  + '\n'
      }else{
        out += '";\n' + space + current.js + '\n';
      }
    }else{ // text
      if(prev.type == NODE_TYPE.Code){
        out += space;
        if(flag){
          out += '__sml__out += "' + current.js;
        }else{
          out += 'var __sml__out = "' + current.js;
          flag = true;
        }
      }else{
        out += current.js;
      }
    }
  }
  
  return out;
}

Compiler.prototype.parse = function(){
  while(this.index < this.lines.length){
  
    //忽略注释及空行
    while(this.index < this.lines.length){
      if((/^ *$/.test(this.lines[this.index]) || /^ *\/\//.test(this.lines[this.index]))){
        this.index++;
      }else{
        break;
      }
    }
    
    var line = this.lines[this.index];
    var captures = /^( *)/.exec(line); 
    var indentLength = captures[1].length;
    var content = line.substr(indentLength);
    var filename = this.filename;
    var lineno = this.index + 1;
    var indent = captures[1];

    //忽略注释及空行
    while(this.index + 1 < this.lines.length){
      if((/^ *$/.test(this.lines[this.index + 1]) || /^ *\/\//.test(this.lines[this.index + 1]))){
        this.index++;
      }else{
        break;
      }
    }
    
    var next = this.lines[this.index + 1];
    
    if(next){
      var nextCaptures = /^( *)/.exec(next);
      var nextIndentLength = nextCaptures[1].length;

      if(indentLength == nextIndentLength){
        var out = output(content, filename, lineno, indent, true);
        
        if(out[0].type === NODE_TYPE.Extends){
          this.extend = out[0];
        }else{
          this.current[0].push(out[0]);
        }
        
        if(out[0].type == NODE_TYPE.Block) this.blocks[out[0].name] = [];
        
        if(out[1]) this.current[0].push(out[1]);
      }else if(indentLength < nextIndentLength){
        var out = output(content, filename, lineno, indent, false);
        
        if(out[0].type === NODE_TYPE.Extends){
          this.extend = out[0];
        }else{
          this.current[0].push(out[0]);
        }
        
        if(out[0].type == NODE_TYPE.Block){
          var name = out[0].name;
          this.blocks[name] = [];
          this.current.unshift(this.blocks[name]);
        }

        if(out[1]) this.stack.unshift(out[1]);
      }else{
        var out = output(content, filename, lineno, indent, true);
        
        if(out[0].type === NODE_TYPE.Extends){
          this.extend = out[0];
        }else{
          this.current[0].push(out[0]);
        }
        
        if(out[0].type == NODE_TYPE.Block) this.blocks[out[0].name] = [];
        if(out[1]) this.current[0].push(out[1]);
        
        while(this.stack.length && this.stack[0].indent.length >= nextIndentLength){
          if(this.stack[0].indent.length < this.current[0][0].indent.length && this.current.length > 1){
            this.current.shift();
          }
          this.current[0].push(this.stack.shift());
        }
        
        if(nextIndentLength < this.current[0][0].indent.length && this.current.length > 1){
            this.current.shift();
        }
      }
    }else{
      var out = output(content, filename, lineno, indent, true);
      
      if(out[0].type === NODE_TYPE.Extends){
        this.extend = out[0];
      }else{
        this.current[0].push(out[0]);
      }
      
      if(out[0].type == NODE_TYPE.Block) this.blocks[out[0].name] = [];
      if(out[1]) this.current[0].push(out[1]);
      
      while(this.stack.length){
        if(this.stack[0].indent.length < this.current[0][0].indent.length && this.current.length > 1){
          this.current.shift();
        }
        this.current[0].push(this.stack.shift());
      }
    }
    
    this.index++;
  }
};

function output(content, filename, lineno, indent, flag){
  var out = doctype(content, flag) || 
            tag(content, flag) || 
            code(content, flag) || 
            text(content, flag);
  
  out[0].file = filename;
  out[0].line = lineno;
  out[0].indent = indent;
  
  if(out[0].type == NODE_TYPE.Error){
    rt.rethrow(out[0].error, filename, lineno, out[0].sml, out[0].js);
  }
  
  if(out[1]){
    out[1].file = filename;
    out[1].line = lineno;
    out[1].indent = indent;
  }
  
  return out;
}

var doctypes = {
  'html': '<!DOCTYPE html>',
  'xml': '<?xml version="1.0" encoding="utf-8" ?>',
  'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
  'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
  'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
  '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
  'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',
  'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">'
};

/**
  @overview DOCTYPE 文档类型 
  @example
    !doctype  
    !doctype html
    !doctype html yourtype
  */
function doctype(content, flag){
  var captures = /^!doctype *([^\n]+)?/.exec(content)
  
  if(captures){
    type = captures[1] || 'html';
    var doctype = doctypes[type] ? doctypes[type] : '<!DOCTYPE ' + type + '>';
    
    return [{
      type: NODE_TYPE.Text,
      sml: content,
      js: doctype
    }];
  }
  
  return null;
}

/**
  @overview Tag 标签
  @example
    !div
    !div text
    !div(id="id" class="class")text
    !div (id="id" class="class") text        
  */
function tag(content, flag){
  var captures = /^!(\w[-\w]*) *(\([^\n]+\))? *([^\n]+)?/.exec(content);
  
  if(captures){
    var out = '<'
    var tag = captures[1];
    var attrs = captures[2];
    var txt = captures[3];
    
    out += tag;
    
    if(attrs){
      out += ' ' + attrs.substr(1, attrs.length -2).replace(/"/g, '\'')
                        .replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? __sml__runtime.escape(' + c + ') : "") + "' ;})
                        .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? ' + c + ' : "") + "' ;});
    }
    
    out += '>';
    
    if(selfCloseTags[tag]){
      return [{
        type: NODE_TYPE.Text,
        sml: content,
        js: out
      }];
    }
    
    if(txt){
      out += txt.replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? __sml__runtime.escape(' + c + ') : "") + "' ;})
                .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? ' + c + ' : "") + "' ;});
    }
    
    if(flag){
      return [{
        type: NODE_TYPE.Text,
        sml: content,
        js: out + '</' + tag + '>'
      }];
    }
    
    return [{
      type: NODE_TYPE.Text,
      sml: content,
      js: out
    }, {
      type: NODE_TYPE.Text,
      sml: content,
      js: '</' + tag + '>'
    }];
  }
  
  return null;
}

/**
  @overview Code 代码
  @example
    - var foo = 'bar';
    - foo += 'baz';
    - if(foo == 'bar')
    - else if(it.name)
    - else
    - for(var i = 0, l = it.users.length; i < l; i++)
    - for(var name in it.someobject)
    - while(some)
    - switch(some)
    - case tag:
    - default:
    - include path
    - extends path
    - block name
  */
function checkSyntax(code){
  try{
    eval(code);
  }catch(err){
    return (err instanceof SyntaxError && err.message !== 'Unexpected token in') ? err : null;
  }
  
  return null;
}

function checkFile(filename){
  try{
    fs.readFileSync(filename);
  }catch(err){
    return err;
  }
  
  return null;
}

function code(content, flag){
  if(content[0] !== '-') return null;
  var captures = /^- *([^\n]+)/.exec(content);
  var ifelse;
  var iterator;
  var extend;
  var block;
  var include;
  var error

  if(captures){
    if(ifelse = /^- *(if|else if|for|while|switch) *\((.*)\)/.exec(content)){
      error = checkSyntax(ifelse[2]);
      if(error){
        return [{
          type: NODE_TYPE.Error,
          sml: content,
          js: captures[1] + '{',
          error: error
        }];
      }
      
      if(flag){
        return [{
          type: NODE_TYPE.Code,
          sml: content,
          js: captures[1] + '{}'
        }];
      }
      
      return [{
        type: NODE_TYPE.Code,
        sml: content,
        js: captures[1] + '{'
      }, {
        type: NODE_TYPE.Code,
        sml: content,
        js: '}'
      }];
    }
    
    if(/^- *else/.test(content)){
      if(flag){
        return [{
          type: NODE_TYPE.Code,
          sml: content,
          js: captures[1] + '{}'
        }];
      }
      
      return [{
        type: NODE_TYPE.Code,
        sml: content,
        js: captures[1] + '{'
      }, {
        type: NODE_TYPE.Code,
        sml: content,
        js: '}'
      }];
    }
  
    if(/^- *(case|default)/.test(content)){
      if(flag){
        return [{
          type: NODE_TYPE.Code,
          sml: content,
          js: captures[1]
        }];
      }
      
      return [{
        type: NODE_TYPE.Code,
        sml: content,
        js: captures[1]
      }, {
        type: NODE_TYPE.Code,
        sml: content,
        js: '  break;'
      }];
    }
    
    if(include = /^- *include +([^\n]+)/.exec(content)){
      var file = include[1].trim().replace(/\.sml/, '.js');
      error = checkFile(file);
      if(error){
        return [{
          type: NODE_TYPE.Error,
          name: file,
          sml: content,
          js: '" + require("' + file + '").render(it) + "',
          error: error
        }];
      }
      
      return [{
        type: NODE_TYPE.Include,
        name: file,
        sml: content,
        js: '" + require("' + file + '").render(it) + "'
      }];
    }
    
    if(extend = /^- *extends +([^\n]+)/.exec(content)){
      var name = extend[1].trim().replace(/\.sml/, '.js');
      error = checkFile(name);
      if(error){
        return [{
          type: NODE_TYPE.Error,
          name: name,
          sml: content,
          js: '__sml__runtime.extend(__sml__class, require("' + name + '").getClass());',
          error: error
        }];
      }
      
      return [{
        type: NODE_TYPE.Extends,
        name: name,
        sml: content,
        js: '__sml__runtime.extend(__sml__class, require("' + name + '").getClass());'
      }];
    }
    
    if(block = /^- *block +([^\n]+)/.exec(content)){
      var name = block[1].trim();
      return [{
        type: NODE_TYPE.Block,
        name: name,
        sml: content,
        js: '" + this.block' + name + '(it) + "'
      }];
    }
    
    error = checkSyntax(captures[1]);
    if(error){
      return [{
        type: NODE_TYPE.Error,
        sml: content,
        js: captures[1],
        error: error
      }];
    }
    
    return [{
      type: NODE_TYPE.Code,
      sml: content,
      js: captures[1], 
    }]
  }
  
  return null;
}

/**
  @overview Text 文本 除空行、注释、文档类型、标签、代码之外的都视为文本行
  @example
    <div></div>      
  */
function text(content, flag){
  var out = content.replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? __sml__runtime.escape(' + c + ') : "") + "' ;})
                   .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? ' + c + ' : "") + "' ;});
                
  return [{
    type: NODE_TYPE.Text,
    sml: content,
    js: out
  }];
}