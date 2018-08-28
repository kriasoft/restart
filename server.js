/* eslint-disable no-console, import/no-extraneous-dependencies */

console.log('server.js');

const express = require('express');

const app = express();

let count = 0;

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send(`${(count += 1)}`);
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Node.js app listening on port ${server.address().port}.`);
  console.log('Press CTR+C to cancel.');
});

server.on('close', () => {
  console.log('server.close');
});

module.exports = server;
