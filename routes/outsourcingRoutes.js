const express = require('express');
const router = express.Router();
const outsourcing_controller = require('../controllers/outsourcingController'); // Ensure this path is correct

router.get('/', outsourcing_controller.outsourcing_list);
router.get('/create', outsourcing_controller.outsourcing_create_get);
router.post('/create', outsourcing_controller.outsourcing_create_post);
router.get('/:id/edit', outsourcing_controller.outsourcing_edit_get);
router.post('/:id/edit', outsourcing_controller.outsourcing_edit_post);
router.post('/:id/delete', outsourcing_controller.outsourcing_delete);

module.exports = router; 