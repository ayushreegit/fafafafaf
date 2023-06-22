import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    usertype:{
        type:String,
        enum:["Agent","Client"]
    }

})

export const User = mongoose.model("User",schema)
