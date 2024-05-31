import express, { Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"

import route from "./routes/route.js";


const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());


mongoose.connect(URL)
  .then(() => {
    console.log("Database Connected Successfully !!!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error.message);
  });

app.use("/api",route)



