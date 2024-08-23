const express = require('express');
const router = express.Router();
const technology_controller = require('../controllers/technologyController');

router.get('/', technology_controller.technology_list);
router.get('/create', technology_controller.technology_create_get);
router.post('/create', technology_controller.technology_create_post);
router.get('/:id/edit', technology_controller.technology_edit_get);
router.post('/:id/edit', technology_controller.technology_edit_post);
router.post('/:id/delete', technology_controller.technology_delete);

module.exports = router;