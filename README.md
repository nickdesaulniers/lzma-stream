# LZMA-Stream

Provides streams that transform input to and from LZMA compression.

## Usage

```js
var fs = require('fs');
var lzma = require('lzma-streams');

var compressor = new lzma.LZMACompressionStream;
var decompressor = new lzma.LZMADecompressionStream;

fs.createReadStream('./lorem_ipsum.txt')
  .pipe(compressor)
  .pipe(decompressor)
  .pipe(process.stdout);
```

