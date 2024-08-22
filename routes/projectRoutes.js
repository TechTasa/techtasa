const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const project_controller = require('../controllers/projectController');

router.get('', project_controller.project_list);
router.get('/create', project_controller.project_create_get);
router.post('/create', upload.single('image'), project_controller.project_create_post);
router.get('/edit/:id', project_controller.project_edit_get);
router.post('/edit/:id', upload.single('image'), project_controller.project_edit_post);
router.get('/delete/:id', project_controller.project_delete);

module.exports = router;