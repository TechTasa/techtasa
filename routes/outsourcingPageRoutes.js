const express = require('express');
const router = express.Router();
const outsourcing_controller = require('../controllers/outsourcingPageController');

// Route to get the list of outsourcing services
router.get('/', outsourcing_controller.outsourcing_index);

// Route to get a specific outsourcing service's details
router.get('/:id', outsourcing_controller.outsourcing_detail);

module.exports = router; 