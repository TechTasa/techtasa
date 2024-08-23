const express = require('express');
const router = express.Router();
const technology_controller = require('../controllers/technologyPageController');

// Route to get the list of technologies
router.get('/', technology_controller.technology_index);

// Route to get a specific technology's details
router.get('/:id', technology_controller.technology_detail);

module.exports = router;