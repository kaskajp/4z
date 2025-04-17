---
title: AI Use Case - Fixing a JavaScript import error (CommonJS vs ES Modules)
date: 2025-04-17
---

I recently ran into an error at work where the compiled and minified JavaScript file caused a ReferenceError. The error was due to how certain dependencies were being imported.

I was able to fix the issue by asking the AI to help me debug the issue.

## AI Used

Cursor with Claude-3.7-Sonnet in Agent mode.

## The Error

![ReferenceError](/assets/images/posts/2025-04-17-js-reference-error.jpg)

## The Prompt

```
When running serve:prod I get this error:

ReferenceError: e is not defined

var exports = {};
var module = {
    exports: exports
};
function define(f) {
    f()
}
;define.amd = true;
(function t(i) {
    e.exports = function() {
        "use strict";
        function e(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var i = 0, r = Array(t); i < t; i++)
                r[i] = e[i];
            return r
        }
...
```

## The Solution

The `index.js` file went from this:

```javascript
Hls = require('hls.js');
Plyr = require('plyr');
require('./player.js');
require('./playlist.js');
require('./audioplayer.js');
```

To this:

```javascript
// Import dependencies
import Hls from 'hls.js';
import * as Plyr from 'plyr';

// Import local modules
import './player.js';
import './playlist.js';
import './audioplayer.js';

// Export modules for external usage
window.Hls = Hls;
window.Plyr = Plyr;
```

Then, some WebPack configuration was changed to support the new way of importing the dependencies.

## The WebPack Configuration

The library section and rules section were added, as well as `globalObject` to ensure the library is available in the global scope. The `babel-loader` was also installed.

```javascript
output: {
  filename: 'player.min.js',
  path: path.resolve(__dirname, 'dist'),
  clean: true,
  library: {
    name: 'Player',
    type: 'umd',
    umdNamedDefine: true
  },
  globalObject: 'this'
},
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
},
```

## Conclusion

While this issue was not the most complex, it was not immediately clear what was causing the issue. The AI was able to help me debug the issue and provide a solution.
