/** 
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview Simple Markup Language
  @author QianYe(coordcn@163.com)
  @reference http://www.haml.info/
             http://jade-lang.com/
             http://www.jsonml.org/
 */

var debug = require('./lib/debug');
var release = require('./lib/release');
var path = require('path');
var fs = require('fs');

var escape_chars = 'var __sml__escape_chars={"&":"&#38;","<":"&#60;",">":"&#62;",\'"\':"&#34;","\'":"&#39;"};';
var escape_regexp = 'var __sml__escape_regexp=/&(?!\w+;)|<|>|"|\'/g;';    
function __sml__escape_replace(m){return __sml__escape_chars[m];}
function __sml__escape(content){if(typeof content!=='string'||!(__sml__escape_regexp.test(content)))return content;return content.replace(__sml__escape_regexp,__sml__escape_replace);}
var escape = escape_chars + escape_regexp + __sml__escape_replace.toString() + __sml__escape.toString();

var debug_start = 'module.exports = function(it){ it = it || {}; var __sml__out = "";';
var debug_end = '\n  return __sml__out;\n\n};';

var release_start = 'module.exports=function(it){it=it||{};';
var release_end = '";return __sml__out;};';
var prefix = 'SMLView';
/**
  @param source {string} file(example.sml) or folder(example)
  @param options {object}
    {
      debug: {boolean|default:false}
      folder: {string}
      prefix: {string|default:'SMLView'}
    }
 */
exports.compile = function(source, options){
  if(path.extname(source)){ // file example.sml
  }else{ // folder
  }
};