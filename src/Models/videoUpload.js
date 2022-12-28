const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    video: {
        type: String,
        require: true
    },

}, { timestamps: true });

module.exports = mongoose.model("video", mediaSchema)