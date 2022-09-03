const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    location:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true
    },
    likes: {
        type:Array,
        default:[]
    },
});

module.exports = mongoose.model("posts", postSchema);
