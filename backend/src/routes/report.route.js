const express = require('express');

const router = express.Router();

const report = require('../controller/report.controller');

router.post('/', report);

module.exports = router;