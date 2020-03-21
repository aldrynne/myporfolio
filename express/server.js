'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => {
//   res.send('sample')
// });
// router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/api', require('./router/api'))

// app.use('/.netlify/functions/server', router);  // path must route to lambda

app.use( '/', express.static( path.join(__dirname, '../', '/dist') ) );

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/dist/index.html'))
})

module.exports = app;
module.exports.handler = serverless(app);
