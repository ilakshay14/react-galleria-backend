const mongoose = require('mongoose');
const image = require('./image.schema');

const DB = {
    mongoose: mongoose,
    imageModel: image
};

module.exports = DB;