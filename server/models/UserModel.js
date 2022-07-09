import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String, 
        required: true
    },lastName:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    worksAt: String,
    relationships: String,
    country: String,
    followers: [],
    following: [],
},
{timestamps: true}
);

export default mongoose.model("UserModel", userSchema);

