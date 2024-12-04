const mongoose = require('mongoose');

const readyToSellSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,  // Single thumbnail image
    images: [String],   // Multiple images
    videos: [String],   // Multiple videos
    documents: [String], // Multiple documents
    shortDescription: String,
    url: String,
    author: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReadyToSell', readyToSellSchema);