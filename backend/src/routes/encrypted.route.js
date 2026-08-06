const express = require('express');

const router = express.Router();

const { encrypted, submitDecoded, addMessage } = require('../controller/encrypt.controller');

router.get('/', encrypted);
router.post("/", addMessage);
router.post('/submit', submitDecoded);

module.exports = router;