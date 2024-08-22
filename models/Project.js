const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    image: String,
    shortDescription: String,
    contentDelta: Object,
    author: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);