// imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
// const {firebaseApp} = require('./configProject');

// create server
const app = express();

// db
// const db = firebase.firestore();
// const works = db.colections('works');
// console.log(works);

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
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/avatar', express.static(path.join(__dirname, '..', 'photo'))); // localhost:5000/photoName.png;

module.exports = { app };
