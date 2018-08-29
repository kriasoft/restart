/* eslint-disable no-console, import/no-extraneous-dependencies */

const express = require('express');

const app = express();

let count = 0;

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send(`count: ${++count}`);
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Node.js app listening on port ${server.address().port}.`);
});

server.on('close', () => {
  // Here you can clean up unused resources
  console.log('server.close');
});

module.exports = server;
