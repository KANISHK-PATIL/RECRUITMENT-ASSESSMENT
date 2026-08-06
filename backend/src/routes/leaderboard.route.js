const express = require('express');

const router = express.Router();

const leaderboard = require('../controller/leaderboard.controller');

router.get('/', leaderboard.lead)

router.post('/', leaderboard.addlead);

module.exports = router;