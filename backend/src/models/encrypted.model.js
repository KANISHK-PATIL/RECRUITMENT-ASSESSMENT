const mongoose = require('mongoose');

const encryptedSchema = new mongoose.Schema({

    encrypt:{
            type:String,
            required:true
},

    answer:{
            type:String,
            required:true
},

    hint: String
},{
timestamps:true
});

module.exports = mongoose.model('encrypted', encryptedSchema);