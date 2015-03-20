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

function parse(lines, stack){
  if(!lines || !lines.length) return '';
  
  stack = stack || [];
  var out = '';

  // 处理行前空行和注释
  // 以//开头的都视为注释 只支持行注释
  while(lines.length && (/^ *$/.test(lines[0]) || /^ *\/\//.test(lines[0]))){
    out += lines.shift() + '\n';
  }
  
  if(!lines.length) return out;
  
  var line = lines.shift();
  var captures = /^( *)/.exec(line); 
  var indents = captures[1].length;
  var content = line.substr(indents);
  
  // 处理行后空行和注释
  // 以//开头的都视为注释 只支持行注释
  var nextOut = '';
  while(lines.length && (/^ *$/.test(lines[0]) || /^ *\/\//.test(lines[0]))){
    nextOut += lines.shift() + '\n';
  }
  
  var next = lines[0];
  var close = [];
  
  out += captures[1];

  if(next){
    var nextCaptures = /^( *)/.exec(next);
    var nextIndents = nextCaptures[1].length;
    
    if(indents == nextIndents){
      close[1] = 0;
      out += doctype(content) || tag(content, close) || code(content, close) || text(content);
      
      return out + '\n' + nextOut + parse(lines, stack);
    }else if(indents < nextIndents){
      close[1] = 1;
      out += doctype(content) || tag(content, close) || code(content, close) || text(content);
      
      stack.unshift({
        indents: indents,
        close: close[0] ? close[0] : ''
      });
      
      return out + '\n' + nextOut + parse(lines, stack);
    }else{
      close[1] = 0;
      out += doctype(content) || tag(content, close) || code(content, close) || text(content);
      
      var temp = '';
      
      while(stack.length && stack[0].indents >= nextIndents){
        var stackClose = stack[0].close;
        
        if(stackClose === '}' || stackClose === ' break;'){
          temp = temp ? ('__sml__out += "' + temp + '";') : '';
          out +=  temp + stackClose;
          temp = '';
        }else{
          temp += stackClose;
        }
        
        stack.shift();
      }

      temp = temp ? ('__sml__out += "' + temp + '";') : '';
      return out + temp + '\n' + nextOut + parse(lines, stack);
    }
  }else{
    close[1] = 0;
    out += doctype(content) || tag(content, close) || code(content, close) || text(content);
  
    var temp = '';
    if(stack && stack.length){
      for(var i = 0, l = stack.length; i < l; i++){
        var stackClose = stack[i].close;

        if(stackClose === '}' || stackClose === ' break;'){
          temp = temp ? ('__sml__out += "' + temp + '";') : '';
          out +=  temp + stackClose;
          temp = '';
        }else{
          temp += stackClose;
        }
      }
    }
    
    temp = temp ? ('__sml__out += "' + temp + '";') : '';
    return out + temp + '\n' + nextOut;
  }
}

var start = 'module.exports = function(it){ it = it || {}; var __sml__out = "";';
var end = '\n\n  return __sml__out;\n\n};';

var escape_chars = 'var __sml__escape_chars = { "&": "&#38;", "<": "&#60;", ">": "&#62;", \'"\': "&#34;", "\'": "&#39;"};\n';
var escape_regexp = 'var __sml__escape_regexp = /&(?!\w+;)|<|>|"|\'/g;\n';    
function __sml__escape_replace(m){ return __sml__escape_chars[m]; }
function __sml__escape(content){
  if(typeof content !== 'string' || !(__sml__escape_regexp.test(content))) return content; 
  return content.replace(__sml__escape_regexp, __sml__escape_replace); 
}

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
  var parsed = parse(lines);
  
  var output = start + parsed + end + escape_chars + escape_regexp + __sml__escape_replace.toString() + '\n' + __sml__escape.toString();
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
    !doctype html your type
  */
function doctype(content){
  var captures = /^!doctype *([^\n]+)?/.exec(content)
  if(captures){
    type = captures[1] || 'html';
    var doctype = doctypes[type] ? doctypes[type] : '<!DOCTYPE ' + type + '>';
    return '__sml__out += "' + doctype + '";';
  }
  
  return '';
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
    var out = '__sml__out += "<'
    var tag = captures[1];
    var attrs = captures[2];
    var txt = captures[3];
    
    out += tag;
    
    if(attrs){
      out += ' ' + attrs.substr(1, attrs.length -2).replace(/"/g, '\'')
                      .replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? __sml__escape(' + c + ') : "") + "' ; })
                      .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? ' + c + ' : "") + "' ; });
    }
    
    out += '>';
    
    if(selfCloseTags[tag]){
      return out + '";';
    }
    
    if(txt){
      out += txt.replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? __sml__escape(' + c + ') : "") + "' ; })
                .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? ' + c + ' : "") + "' ; });
    }
    
    if(close[1] == 1){
      close[0] = '</' + tag + '>';
      return out + '";';
    }
    
    return out + '</' + tag + '>";';
  }
  
  return '';
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
  */
function code(content, close){
  if(content[0] !== '-') return '';
  var captures = /^- *([^\n]+)/.exec(content);
  var out = '';

  if(captures){
    if(/^- *(if|else if|else|for|while|switch)/.test(content)){
      out += captures[1] + '{';
      close[0] = '}';
      
      return out;
    }
  
    if(/^- *(case|default)/.test(content)){
      close[0] = ' break;'
    }
    
    return captures[1];
  }
  
  return '';
}

/**
  @overview Text 文本 除空行、注释、文档类型、标签、代码之外的都视为文本行
  @example
    <div></div>      
  */
function text(content){
  var out = '__sml__out += "';

  out += content.replace(/#\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? __sml__escape(' + c + ') : "") + "' ; })
                .replace(/!\{\s*(\S+)\s*\}/g, function(m, c){ return '" + ((' + c + ' || typeof ' + c + ' === "boolean") ? ' + c + ' : "") + "' ; });

  return out + '";';
}