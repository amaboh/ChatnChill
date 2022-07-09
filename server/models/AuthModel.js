import mongoose from 'mongoose';

const Schema = mongoose.Schema

const authSchema = new Schema(
    {
    members: {
        type: Array,
    },
    },
    {
        timestamp: true,
    }
    
);

export default mongoose.model("AuthModel", authSchema)