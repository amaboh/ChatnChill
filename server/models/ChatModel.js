import mongoose from 'mongoose';

const Schema = mongoose.Schema

const chatSchema = new Schema(
    {
    members: {
        type: Array,
    },
    },
    {
        timestamp: true,
    }
    
);

export default mongoose.model("ChatModel", chatSchema)