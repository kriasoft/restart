/*
 * Copyright (c) 2018-present Kriasoft | MIT License
 */

'use strict;';

const clearModule = require('clear-module');

let server;

function launch(options) {
  return new Promise((resolve, reject) => {
    try {
      server = (x => x.default || x)(require(options.entry));
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
  if (!options.entry) {
    throw new TypeError('The options argument must have an "entry" field.');
  }

  if (server && server.close) {
    return new Promise(resolve => {
      server.close(() => {
        clearModule(options.entry);
        resolve(launch(options));
      });
    });
  }

  clearModule(options.entry);
  return launch(options);
}

module.exports = restart;
