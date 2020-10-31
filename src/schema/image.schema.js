const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    type: String
});

module.exports = mongoose.model('Images', imageSchema);