var data = {
  title: 'Simple Markup Language Test',
  unescaped: '<a href="http://www.baidu.com">百度</a>',
  escaped: '<div>"冒号"\'还是冒号\'&</div>',
  users: [
    {name: 'qianye', age:32},
    {name: 'qianer', age:18},
    {name: 'qiansan', age:16},
    {name: 'qiansi', age:18},
    {name: 'qianwu', age:40}
  ],
  deep0: {
    deep1: {
      deep2: true
    }
  },
  elseifcase0: false,
  elseifcase1: false,
  ifresult: 'ifresult aaaaaaaa',
  elseifresult: '<div>""\'\'&</div>',
  forin: {
    qianye: 32,
    qianer: 18,
    qiansan: 16,
    qiansi: 18,
    qianwu: 40
  },
  whilecase: [
    {name: 'qianye', age:32},
    {name: 'qianer', age:18},
    {name: 'qiansan', age:16},
    {name: 'qiansi', age:18},
    {name: 'qianwu', age:40}
  ],
  switch: 6
};

var fs = require('fs');
var tag = require('./tag.js');
var out;

var run_num = 100000;
var start = new Date();

for(var j = 0; j < run_num; j ++) {
  var out = tag.render(data);
}

var seconds = (new Date() - start) / 1000;
console.log('use: ' + seconds + ' sec, rps: ' + (run_num / seconds));
console.log('--------------------------------------------');

var tagg = require('./tagg.js');
var outg;
var startg = new Date();

for(var j = 0; j < run_num; j ++) {
  var outg = tagg.render(data);
}

var secondsg = (new Date() - startg) / 1000;
console.log('use: ' + secondsg + ' sec, rps: ' + (run_num / secondsg));
console.log('--------------------------------------------');

var tagg1 = require('./tagg1.js');
var outg1;
var startg1 = new Date();

for(var j = 0; j < run_num; j ++) {
  var outg1 = tagg1.render(data);
}

var secondsg1 = (new Date() - startg1) / 1000;
console.log('use: ' + secondsg1 + ' sec, rps: ' + (run_num / secondsg1));
console.log('--------------------------------------------');

var tagg2 = require('./tagg2.js');
var outg2;
var startg2 = new Date();

for(var j = 0; j < run_num; j ++) {
  var outg2 = tagg2.render(data);
}

var secondsg2 = (new Date() - startg2) / 1000;
console.log('use: ' + secondsg2 + ' sec, rps: ' + (run_num / secondsg2));
console.log('--------------------------------------------');

var tagg3 = require('./tagg3.js');
var outg3;
var startg3 = new Date();

for(var j = 0; j < run_num; j ++) {
  var outg3 = tagg3.render(data);
}

var secondsg3 = (new Date() - startg3) / 1000;
console.log('use: ' + secondsg3 + ' sec, rps: ' + (run_num / secondsg3));
console.log('--------------------------------------------');

var tagg4 = require('./tagg4.js');
var outg4;
var startg4 = new Date();

for(var j = 0; j < run_num; j ++) {
  var outg4 = tagg4.render(data);
}

var secondsg4 = (new Date() - startg4) / 1000;
console.log('use: ' + secondsg4 + ' sec, rps: ' + (run_num / secondsg4));
console.log('--------------------------------------------');

fs.writeFileSync('test.html', out);

fs.writeFileSync('testg.html', outg);

fs.writeFileSync('testg1.html', out);

fs.writeFileSync('testg2.html', outg);

fs.writeFileSync('testg3.html', out);

fs.writeFileSync('testg4.html', outg);