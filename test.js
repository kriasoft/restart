/* eslint-disable no-console */

const assert = require('assert');
const fetch = require('node-fetch');

(async () => {
  const options = { entry: './server' };
  const restart = require('.');
  let server = await restart(options);
  const resp1 = await fetch('http://localhost:8080/').then(x => x.text());
  const resp2 = await fetch('http://localhost:8080/').then(x => x.text());
  assert(resp1 === 'count: 1');
  assert(resp2 === 'count: 2');
  server = await restart(options);
  const resp3 = await fetch('http://localhost:8080/').then(x => x.text());
  assert(resp3 === 'count: 1');
  server = await restart(options);
  const resp4 = await fetch('http://localhost:8080/').then(x => x.text());
  assert(resp4 === 'count: 1');
  server.close();
})().catch(console.error);
