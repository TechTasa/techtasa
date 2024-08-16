const express = require('express');
const leadsController = require('../controllers/leadsController');

const router = express.Router();

router.get('/', leadsController.getLeads);

module.exports = router;
