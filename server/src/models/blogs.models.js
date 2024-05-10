const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

module.exports = {Blog : mongoose.model("Blog",blogSchema)};