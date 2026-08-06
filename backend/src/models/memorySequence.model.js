const mongoose = require("mongoose");

const memorySequenceSchema = new mongoose.Schema({

    level: {
        type: Number,
        required: true
    },

    sequence: {
    type: [String],
    required: true
}

}, {
    timestamps: true
});

module.exports = mongoose.model("MemorySequence", memorySequenceSchema);