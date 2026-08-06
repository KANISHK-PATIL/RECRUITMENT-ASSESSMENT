const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },

    score:{
        type: Number,
        required: true,
    },

    classification:{
        type: String,
        required: true,
    },

    totalTime:{
        type: Number,
        required: true,
    },

    playedAt:{

        type:Date,

        default:Date.now

    }

},{
timestamps:true
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);