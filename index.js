var lzma = require('lzma');
var stream = require('stream');
var util = require('util');

function genPushBufferedResult (ctx, done) {
  return function (result) {
    ctx.push(new Buffer(result));
    done();
  }
};

function LZMACompressionStream (opt) {
  opt = opt || {};
  stream.Transform.call(this, opt);
  this.level = opt.level || 1;
};

util.inherits(LZMACompressionStream, stream.Transform);

LZMACompressionStream.prototype._transform = function (chunk, encoding, done) {
  lzma.compress(chunk, this.level, genPushBufferedResult(this, done));
};

function LZMADecompressionStream (opt) {
  opt = opt || {};
  stream.Transform.call(this, opt);
};

util.inherits(LZMADecompressionStream, stream.Transform);

LZMADecompressionStream.prototype._transform = function (chunk, encoding, done) {
  lzma.decompress(chunk, genPushBufferedResult(this, done));
};

module.exports = {
  LZMACompressionStream: LZMACompressionStream,
  LZMADecompressionStream: LZMADecompressionStream,
};

