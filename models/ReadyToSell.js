const mongoose = require('mongoose');

const readyToSellSchema = new mongoose.Schema({
    title: String,
    image: String,
    shortDescription: String,
    url: String,
    author: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReadyToSell', readyToSellSchema); 