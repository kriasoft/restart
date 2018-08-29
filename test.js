/* eslint-disable no-console */

const assert = require('assert');
const fetch = require('node-fetch');

(async () => {
  const options = { entry: './server' };
  const restart = require('.');
  const server = await restart(options);
  const resp1 = await fetch('http://localhost:8080/').then(x => x.text());
  const resp2 = await fetch('http://localhost:8080/').then(x => x.text());
  assert(resp1 === '1');
  assert(resp2 === '2');
  await restart(options);
  const resp3 = await fetch('http://localhost:8080/').then(x => x.text());
  assert(resp3 === '1');
  await restart(options);
  const resp4 = await fetch('http://localhost:8080/').then(x => x.text());
  assert(resp4 === '1');
  server.close(() => {
    process.exit(0);
  });
})().catch(console.error);
