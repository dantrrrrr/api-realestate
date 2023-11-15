import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

connectDB(); //connect to database
const port = 3000;
const app = express();

app.listen(port, () => {
  console.log("Server running on port " + port);
});
