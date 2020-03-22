'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

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

app.use('/api', require('./api'))

// app.use('/.netlify/functions/server', router);  // path must route to lambda

app.use( '/', express.static( path.join(__dirname, '../dist') ) );
const router = express.Router();
router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})
app.use('/', router);

module.exports = app;
module.exports.handler = serverless(app);
