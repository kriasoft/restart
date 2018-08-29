# Node.js Restart

[![NPM version](https://img.shields.io/npm/v/restart.svg)](https://www.npmjs.com/package/restart)
[![NPM downloads](https://img.shields.io/npm/dw/restart.svg)](https://www.npmjs.com/package/restart)
[![Build Status](https://img.shields.io/travis/kriasoft/restart.svg)](https://travis-ci.org/kriasoft/restart)

This module is designed to restart Node.js app in development mode, e.g. after compilation with
Babel/TypeScript is complete.

## How to Install

```bash
$ npm install restart --save-dev
```

## How to Use

#### `build/app.js`

```js
const express = require('express');
const app = express();

let count = 0;

app.get('/', (req, res) => {
  res.send(`count: ${++count}`);
});

module.exports = app.listen(8080);
```

#### `server.js`

```js
if (process.env.NODE_ENV === 'production') {
  // In a production environment launch the Node.js app directly.
  require('./build/app');
} else {
  // Otherwise, start building the app from source and
  // restart it upon new changes in the /build folder.
  const restart = require('restart');
  const build = require('./scripts/build');
  build({
    watch: true,
    onComplete: () => {
      restart({ entry: './build/app' });
    },
  });
}
```

```bash
$ node ./server
```

## License

Copyright (c) 2018-present Kriasoft | MIT License
