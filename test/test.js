var test = require('tape');
var fs = require('fs');
var lzma = require('..');
var concat = require('concat-stream');

test('compressing then decompressing returns the same results', function (t) {
  t.plan(1);

  var testFile = 'test/lorem_ipsum.txt';
  var beforeBuf = fs.readFileSync(testFile);

  var afterBuf = concat(function (res) {
    t.deepLooseEqual(beforeBuf, res, 'same message before and after');
  });

  fs.createReadStream(testFile)
    .pipe(new lzma.LZMACompressionStream)
    .pipe(new lzma.LZMADecompressionStream)
    .pipe(afterBuf)
});

