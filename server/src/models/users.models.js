const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    contact : {
        type : String,
        required : true,
        unique : true,
    }
},{
    timestamps : true
})

module.exports = {User : mongoose.model("User",userSchema)};