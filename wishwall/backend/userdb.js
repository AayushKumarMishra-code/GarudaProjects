const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true // obviously...
    },
    
    name:{
        type: String,
        required: true,
    },
    
    age: {
        type: Number,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model("newUser", userSchema);