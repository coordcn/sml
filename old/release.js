/** 
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview Simple Markup Language
  @author QianYe(coordcn@163.com)
  @reference http://www.haml.info/
             http://jade-lang.com/
             http://www.jsonml.org/
 */
 
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

function parse(file, lines, lines, output, stack){
  if(!lines || !lines.length) return;
  
  stack = stack || [];

  // 处理行前空行和注释
  // 以//开头的都视为注释 只支持行注释
  while(lines.length && (/^ *$/.test(lines[0]) || /^ *\/\//.test(lines[0]))){
    lines.shift();
  }
  
  if(!lines.length) return;
  
  var line = lines.shift();
  var captures = /^( *)/.exec(line); 
  var indents = captures[1].length;
  var content = line.substr(indents);
  
  // 处理行后空行和注释
  // 以//开头的都视为注释 只支持行注释
  while(lines.length && (/^ *$/.test(lines[0]) || /^ *\/\//.test(lines[0]))){
    lines.shift();
  }
  
  var next = lines[0];
  var close = [];

  if(next){
    var nextCaptures = /^( *)/.exec(next);
    var nextIndents = nextCaptures[1].length;
    
    if(indents == nextIndents){
      close[1] = 0;
      var out = doctype(content) || tag(content, close) || code(content, close) || text(content);
      
      output.push(out);
      return parse(lines, output, stack);
    }else if(indents < nextIndents){
      close[1] = 1;
      var out = doctype(content, close) || tag(content, close) || code(content, close) || text(content, close);
      
      stack.unshift({
        indents: indents,
        close: close[0] ? close[0] : ''
      });
      
      output.push(out);
      return parse(lines, output, stack);
    }else{
      close[1] = 0;
      var out = doctype(content, close) || tag(content, close) || code(content, close) || text(content, close);
      
      output.push(out);
      while(stack.length && stack[0].indents >= nextIndents){
        output.push(stack.shift().close);
      }

      return parse(lines, output, stack);
    }
  }else{
    close[1] = 0;
    var out = doctype(content, close) || tag(content, close) || code(content, close) || text(content, close);
  
    output.push(out);
    if(stack && stack.length){
      for(var i = 0, l = stack.length; i < l; i++){
        output.push(stack.shift().close);
      }
    }

    return;
  }
}

var start = 'module.exports=function(it){it=it||{};';
var end = '";return __sml__out;};';

var escape_chars = 'var __sml__escape_chars={"&":"&#38;","<":"&#60;",">":"&#62;",\'"\':"&#34;","\'":"&#39;"};';
var escape_regexp = 'var __sml__escape_regexp=/&(?!\w+;)|<|>|"|\'/g;';    
function __sml__escape_replace(m){return __sml__escape_chars[m];}
function __sml__escape(content){if(typeof content!=='string'||!(__sml__escape_regexp.test(content)))return content; return content.replace(__sml__escape_regexp,__sml__escape_replace);}

/**
  @param inputFile {string} 输入文件名
  @param outputFile {string} 输出文件名
 */
exports.compile = function(inputFile, outputFile){
  var input = fs.readFileSync(inputFile, 'utf-8');
  input = input.replace(/^\uFEFF/, '')
               .replace(/\r\n|\r/g, '\n')
               .replace(/\t/g, '  ');

  var lines = input.split('\n');
  var outputs = [];
  parse(lines, outputs);
  
  var output = start;
  var flag = false; // fasle: var __sml__out=" true: __sml__out+="
  
  var first = outputs[0];
  if(first.type == 2){
    output += first.content;
  }else{
    output += 'var __sml__out="' + first.content;
    flag = true;
  }

  for(var i = 1, l = outputs.length; i < l; i++){
    var prev = outputs[i - 1];
    var current = outputs[i];

    if(current.type == 2){ // code
      output += (prev.type == 2) ? current.content : '";' + current.content;
    }else if(current.type == 1){ // text
      if(prev.type == 2){
        output += flag ? ('__sml__out+="' + current.content) : ('var __sml__out="' + current.content)
      }else{
        output += current.content;
      }
    }
  }
  
  output += end + escape_chars + escape_regexp + __sml__escape_replace.toString() + __sml__escape.toString();
  fs.writeFileSync(outputFile, output);
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
function doctype(content, close){
  var captures = /^!doctype *([^\n]+)?/.exec(content)
  if(captures){
    type = captures[1] || 'html';
    var doctype = doctypes[type] ? doctypes[type] : '<!DOCTYPE ' + type + '>';
    return {
      type: 1,
      content: doctype
    };
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
function tag(content, close){
  var captures = /^!(\w[-\w]*) *(\([^\n]+\))? *([^\n]+)?/.exec(content);
  
  if(captures){
    var out = '<'
    var tag = captures[1];
    var attrs = captures[2];
    var txt = captures[3];
    
    out += tag;
    
    if(attrs){
      out += ' ' + attrs.substr(1, attrs.length -2).replace(/"/g, '\'')
                      .replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '"+((' + c + '||typeof ' + c + '==="boolean")?__sml__escape(' + c + '):"")+"' ; })
                      .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '"+((' + c + '||typeof ' + c + '==="boolean")?' + c + ':"")+"' ; });
    }
    
    out += '>';
    
    if(selfCloseTags[tag]){
      return {
        type: 1,
        content: out
      };
    }
    
    if(txt){
      out += txt.replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '"+((' + c + '||typeof ' + c + '==="boolean")?__sml__escape(' + c + '):"")+"' ; })
                .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '"+((' + c + '||typeof ' + c + '==="boolean")?' + c + ':"")+"' ; });
    }
    
    if(close[1] == 1){
      close[0] = {
        type: 1,
        content: '</' + tag + '>'
      };
      return {
        type: 1,
        content: out
      };
    }
    
    return {
      type: 1,
      content: out + '</' + tag + '>'
    };
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
    - case 'tag':
    - default:
    下面非javascirpt原生代码，是实现模板包含，模板继承，变量迭代的宏
    - include path
    - extends path
    - block name
    - iterate array|object i|key
  */
function code(content, close){
  if(content[0] !== '-') return '';
  var captures = /^- *([^\n]+)/.exec(content);
  var out = '';
  var iterator;

  if(captures){
    if(/^- *(if|else if|else|for|while|switch)/.test(content)){
      out += captures[1] + '{';
      close[0] = {
        type: 2,
        content: '}'
      };
      
      return {
        type: 2,
        content: out
      };
    }
  
    if(/^- *(case|default)/.test(content)){
      close[0] = {
        type: 2,
        content: 'break;'
      };
    }
    
    return {
      type: 2,
      content: captures[1]
    };
  }
  
  return null;
}

/**
  @overview Text 文本 除空行、注释、文档类型、标签、代码之外的都视为文本行
  @example
    <div></div>      
  */
function text(content, close){
  var out = '';
  out += content.replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '"+((' + c + '||typeof ' + c + '==="boolean")?__sml__escape(' + c + '):"")+"' ; })
                .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '"+((' + c + '||typeof ' + c + '==="boolean")?' + c + ':"")+"' ; });
                
  return {
    type: 1,
    content: out
  };
}