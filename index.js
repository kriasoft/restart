/*
 * Copyright (c) 2018-present Kriasoft | MIT License
 */

'use strict;';

const path = require('path');
const clearModule = require('clear-module');

let server;

function launch(entry) {
  return new Promise((resolve, reject) => {
    try {
      server = (x => x.default || x)(require(entry));
      server.once('error', reject);
      server.once('listening', () => {
        resolve(server);
      });
    } catch (err) {
      reject(err);
    }
  });
}

function restart(options = {}) {
  if (typeof options === 'string') {
    // eslint-disable-next-line no-param-reassign
    options = { entry: options };
  }

  if (!options.entry) {
    throw new TypeError('The options argument must have an "entry" field.');
  }

  const entry = path.resolve(options.entry);

  if (server && server.close) {
    return new Promise(resolve => {
      server.close(() => {
        clearModule(entry);
        resolve(launch(entry));
      });
    });
  }

  clearModule(entry);
  return launch(entry);
}

module.exports = restart;
