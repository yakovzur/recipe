import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

import { userRouter } from "./routes/users.js";


const app = express();

//Middleware
app.use(express.json());
app.use(cors());


//Routes
app.use('/auth', userRouter);

// Mongo DB
mongoose.connect(
    `mongodb+srv://yaki:${process.env.SECRET_KEY}@recipes.aiouyio.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

app.listen(process.env.PORT, () => console.log("SERVER STARTED"))