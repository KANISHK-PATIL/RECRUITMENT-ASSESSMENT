const express = require('express');

const router = express.Router();

const {question, submitAnswer, addQuestion} = require('../controller/aptitude.controller');

router.get('/', question);
router.post("/", addQuestion);
router.post('/submit', submitAnswer);

module.exports = router;