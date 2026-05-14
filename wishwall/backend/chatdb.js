const mongoose = require("mongoose");

const msg = new mongoose.Schema({
    
    message: {
        type: String,
        required: true
    },

    id: {
        type: Number,
        required: true
    },

    time: {
        type: Date,
        required: true
    },

    messageid: {
        type: Number,
        required: true
    }


})

module.exports = mongoose.model("newMsg", msg);