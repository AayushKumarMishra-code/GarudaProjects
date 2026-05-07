const mongoose = require("mongoose");

const msg = new mongoose.Schema({
    
    message: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    time: {
        type: Date,
        required: true
    }


})

module.exports = msg;