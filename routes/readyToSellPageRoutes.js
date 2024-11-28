const express = require('express');
const router = express.Router();
const readyToSellPageController = require('../controllers/readyToSellPageController');

router.get('/', readyToSellPageController.readyToSell_index);
router.get('/:id', readyToSellPageController.readyToSell_detail);

module.exports = router; 