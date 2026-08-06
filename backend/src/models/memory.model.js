const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({

    candidateName: {
        type: String,
        required: true,
    },

    highestLevel: {
        type: Number,
        required: true,
    },

    correctSequences: Number,

    incorrectSequences: Number,

    completionTime: Number,

    score: {
        type: Number,
        required: true,
    }

},{
timestamps:true
});

module.exports = mongoose.model("memory", memorySchema);