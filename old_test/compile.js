var sml = require('../sml');

sml.compile('tag.sml', 'tag.js')

var release = require('../lib/release');

release.compile('tag.sml', 'release.js')