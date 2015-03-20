var sml = require('../lib/sml');
var fs = require('fs');

var filename = 'test.sml';
var str = fs.readFileSync(filename, 'utf-8');
var s = new sml(str, filename);

s.parse();

var out = s.compile();

fs.writeFileSync('test.js', out, 'utf-8');

