const express = require('express');
const router = express.Router();
const readyToSell_controller = require('../controllers/readyToSellController');

router.get('', readyToSell_controller.readyToSell_list);
router.get('/create', readyToSell_controller.readyToSell_create_get);
router.post('/create', readyToSell_controller.readyToSell_create_post);
router.get('/edit/:id', readyToSell_controller.readyToSell_edit_get);
router.post('/edit/:id', readyToSell_controller.readyToSell_edit_post);
router.get('/delete/:id', readyToSell_controller.readyToSell_delete);

module.exports = router;