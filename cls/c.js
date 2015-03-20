var sml = require('../lib/sml');
var fs = require('fs');

var filename = 'tag.sml';
var str = fs.readFileSync(filename, 'utf-8');
var s = new sml(str, filename);

s.parse();

var out = s.compile();

fs.writeFileSync('tag.js', out, 'utf-8');

var filenameg = 'tagg.sml';
var strg = fs.readFileSync(filenameg, 'utf-8');
var sg = new sml(strg, filenameg);

sg.parse();

var outg = sg.compile();

fs.writeFileSync('tagg.js', outg, 'utf-8');

var filenameg4 = 'tagg4.sml';
var strg4 = fs.readFileSync(filenameg4, 'utf-8');
var sg4 = new sml(strg4, filenameg4);

sg4.parse();

var outg4 = sg4.compile();

fs.writeFileSync('tagg4.js', outg4, 'utf-8');

var filenameg1 = 'tagg1.sml';
var strg1 = fs.readFileSync(filenameg1, 'utf-8');
var sg1 = new sml(strg1, filenameg1);

sg1.parse();

var outg1 = sg1.compile();

fs.writeFileSync('tagg1.js', outg1, 'utf-8');

var filenameg2 = 'tagg2.sml';
var strg2 = fs.readFileSync(filenameg2, 'utf-8');
var sg2 = new sml(strg2, filenameg2);

sg2.parse();

var outg2 = sg2.compile();

fs.writeFileSync('tagg2.js', outg2, 'utf-8');

var filenameg3 = 'tagg3.sml';
var strg3 = fs.readFileSync(filenameg3, 'utf-8');
var sg3 = new sml(strg3, filenameg3);

sg3.parse();

var outg3 = sg3.compile();

fs.writeFileSync('tagg3.js', outg3, 'utf-8');