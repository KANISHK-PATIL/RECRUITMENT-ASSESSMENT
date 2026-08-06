const mongoose = require('mongoose');

const aptitudeSchema = new mongoose.Schema({
    
    question: {
        type:String,
        required:true
    },

    option: {
            type:[String],
            required:true
},

    correctAnswer: String

},{
timestamps:true
});

module.exports = mongoose.model('Aptitude', aptitudeSchema);