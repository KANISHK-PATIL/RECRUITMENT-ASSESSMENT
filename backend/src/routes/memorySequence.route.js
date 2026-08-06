const express = require("express");

const router = express.Router();

const {
    addSequence,
    getSequence
} = require("../controller/memorySequence.controller");

router.post("/", addSequence);

router.get("/", getSequence);

module.exports = router;