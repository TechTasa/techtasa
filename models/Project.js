const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    image: String,
    shortDescription: String,
    url: String,
    author: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);