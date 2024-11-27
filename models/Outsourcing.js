const mongoose = require('mongoose');

const outsourcingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroDescription: { type: String, required: true },
    image: { type: String, required: true },
    courseInfo: {
        whatYoullLearn: { type: [String], required: true },
        duration: { type: String, required: true },
        format: { type: String, required: true },
        price: { type: Number, required: true },
        certification: { type: Boolean, default: false }
    },
    benefits: { type: [String], required: true },
    instructor: {
        name: { type: String, required: true },
        image: { type: String },
        bio: { type: String, required: true }
    },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Outsourcing', outsourcingSchema); 