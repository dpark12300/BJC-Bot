const fs = require('fs');

var files = [];

var bytes = 0;

fs.readdirSync('/home/runner/bjcbot-new/').forEach(file => {
	if (fs.lstatSync(file).isDirectory()) return;
	files.push(fs.readFileSync(file, 'utf8'));
	bytes = bytes + fs.statSync(file).size;
});

var lines = files.join(' ').match(/\n/g || []).length;

var chars = files.join(' ').length - files.length;

module.exports.lines = lines;
module.exports.chars = chars;
module.exports.bytes = bytes;