const MemorySequence = require("../models/memorySequence.model");

async function addSequence(req, res) {

    const sequence = await MemorySequence.create(req.body);

    res.status(201).json({
        message: "Sequence added successfully",
        data: sequence
    });

}

async function getSequence(req, res) {

    const { level } = req.query;

    const sequence = await MemorySequence.aggregate([
        { $match: { level: Number(level) } },
        { $sample: { size: 1 } }
    ]);

    res.json(sequence);

}

module.exports = {
    addSequence,
    getSequence
};