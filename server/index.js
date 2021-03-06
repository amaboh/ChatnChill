import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// routes
import chatRoute from "./routes/chatRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  })
);

const PORT = process.env.PORT;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Mongo db server conected");
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
app.use("/api/messages", messageRoute);


app.listen(PORT, () => {
  connect();
  console.log(`Server connected to http://localhost:${process.env.PORT}`);
});
