const mongoose = require("mongoose");

const uploadDeviceSchema = new mongoose.Schema({
    video: {
        type: String,
        require: true
    },
    title:{
        type: String,
        required: true
    },
    category:{
        type : String, 
        required:true
    },
    add_tag:{
        type : String, 
        required:true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("uploadDevice", uploadDeviceSchema)