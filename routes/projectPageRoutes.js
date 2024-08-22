const express = require('express');
const router = express.Router();
const projectPageController = require('../controllers/projectPageController');

router.get('/', projectPageController.project_index);
router.get('/:id', projectPageController.project_detail);

module.exports = router;