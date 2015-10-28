# DO NOT USE
https://github.com/nmrugg/LZMA-JS/issues/34#issuecomment-152024952

# LZMA-Stream

Provides streams that transform input to and from LZMA compression.

## Usage

```js
var fs = require('fs');
var lzma = require('lzma-stream');

var compressor = new lzma.LZMACompressionStream;
var decompressor = new lzma.LZMADecompressionStream;

fs.createReadStream('./lorem_ipsum.txt')
  .pipe(compressor)
  .pipe(decompressor)
  .pipe(process.stdout);
```

