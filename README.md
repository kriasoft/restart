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

```js
const restart = require('restart');
const build = require('./build');

build({
  watch: true,
  onComplete() {
    restart({
      entry: './build/server',
    });
  },
});
```

## License

Copyright (c) 2018-present Kriasoft | MIT License
