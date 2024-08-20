const express = require('express');
const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

// Testimonial routes
router.get('/testimonials', testimonialController.getPublicTestimonials);
router.post('/testimonials', testimonialController.createTestimonial);
router.get('/dashboard/testimonials', testimonialController.getAllTestimonials);
router.get('/dashboard/testimonials/delete/:id', testimonialController.deleteTestimonial);
module.exports = router;