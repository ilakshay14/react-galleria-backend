const mongoose = require('mongoose');
const image = require('./image.schema');
const DB_URL = require('../config/db.config');

const DB = {
    mongoose: mongoose,
    imageModel: image,
    url: DB_URL.URL
};

module.exports = DB;