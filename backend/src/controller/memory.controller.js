const Memory = require("../models/memory.model");

async function MemoryResult(req, res){

    const result = await Memory.create(req.body);

    res.status(201).json(result);
};

module.exports = MemoryResult;