const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
    name: String,
    image: String,
    shortDescription: String,
    heroTitle: String,
    heroDescription: String,
    courseInfo: {
        whatYoullLearn: [String],
        duration: String,
        format: String,
        price: Number,
        certification: Boolean
    },
    benefits: [String],
    instructor: {
        name: String,
        image: String,
        bio: String
    },
    type: { type: String, required: true }, // New field for categorization
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Technology', technologySchema);