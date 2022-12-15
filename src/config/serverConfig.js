// imports
const express = require('express');
// const favicon = require('express-favicon');
const cors = require('cors');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const logger = require('morgan');

// create server
const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

// settings
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(
    logger(formatsLogger, {
        skip: function (req, res) {
            return res.statusCode === 404;
        },
    })
);

const optionCors = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: '*',
};

// add settings
app.use(cors(optionCors));
app.use(express.json());
// app.use(
//     favicon(path.join(__dirname, '..', '..', 'webApp', 'build', 'favicon.png'))
// );
app.use(express.static(path.join(__dirname, '..', '..', 'webApp', 'build')));

module.exports = { app, webSocketServer, server };
