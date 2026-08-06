const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    aptitude: {
        attempted: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        incorrect: { type: Number, default: 0 },
        time: { type: Number, default: 0 },
        score: { type: Number, default: 0 }
    },

    memory: {
        highestLevel: { type: Number, default: 0 },
        correctSequences: { type: Number, default: 0 },
        incorrectAttempts: { type: Number, default: 0 },
        time: { type: Number, default: 0 },
        score: { type: Number, default: 0 }
    },

    encrypted: {
        correct: { type: Number, default: 0 },
        incorrect: { type: Number, default: 0 },
        hintsUsed: { type: Number, default: 0 },
        time: { type: Number, default: 0 },
        score: { type: Number, default: 0 }
    },

    totalScore: {
        type: Number,
        required: true,
    },

    totalTime: Number,

    classification: {
        type: String,
        required: true,
    }

},{
timestamps:true
});

module.exports = mongoose.model('candidate', candidateSchema);