import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors";
import chatRoute from "./routes/chatRoute.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"

dotenv.config()

const app = express();

const PORT = process.env.PORT;

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB);
      console.log("Mongo db sever conected")
    } catch (error) {
      throw error;
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongDB disconnected!");
  });


// routes entry points
app.use("/api/chat", chatRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.listen(PORT,()=>{
    connect()
    console.log(`Server connected to http://localhost/${process.env.PORT}`);
})


