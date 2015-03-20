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
var release = require('./release.js');

fs.writeFileSync('test.html', tag(data));
fs.writeFileSync('release.html', release(data));