var lzma = require('lzma');
var stream = require('stream');
var util = require('util');

function pushBufferedResult (result) {
  this.push(new Buffer(result));
};

function LZMACompressionStream (opt) {
  opt = opt || {};
  stream.Transform.call(this, opt);
  this.level = opt.level || 1;
};

util.inherits(LZMACompressionStream, stream.Transform);

LZMACompressionStream.prototype._transform = function (chunk, encoding, done) {
  lzma.compress(chunk, this.level, pushBufferedResult.bind(this));
};

function LZMADecompressionStream (opt) {
  opt = opt || {};
  stream.Transform.call(this, opt);
};

util.inherits(LZMADecompressionStream, stream.Transform);

LZMADecompressionStream.prototype._transform = function (chunk, encoding, done) {
  lzma.decompress(chunk, pushBufferedResult.bind(this));
};

module.exports = {
  LZMACompressionStream: LZMACompressionStream,
  LZMADecompressionStream: LZMADecompressionStream,
};

