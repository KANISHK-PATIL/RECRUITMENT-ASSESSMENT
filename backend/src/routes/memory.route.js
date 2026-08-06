const express = require('express');

const router = express.Router();

const memory = require('../controller/memory.controller');

router.post('/', memory);

module.exports = router;