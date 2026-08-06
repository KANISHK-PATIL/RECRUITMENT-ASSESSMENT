const leaderboard = require('../models/leaderboard.model');

async function lead(req, res) {

    const data = await leaderboard.find().sort({
        score: -1,       
        totalTime: 1,
    });

    res.json(data);
}

async function addlead(req, res) {

    const addData = await leaderboard.create(req.body);

    res.status(201).json(addData);
}

module.exports = { lead, addlead}