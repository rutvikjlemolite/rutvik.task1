import mongoose, { Schema } from "mongoose";

 const userSchema = new Schema({

    username:{
        type:String,
        require: true,
        unique: true,
    },

    email:{
        type:String,
        require: true,
        unique:true,
    },

    role:{
        type: String,
        require:true,

    },

    password: {
        type:String,
        require: true
    },

    confirm_password: {
        type:String,
        require: true
    }

} , {timestamps:true});

const User = mongoose.model("User", userSchema);

export default User 
