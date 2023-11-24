import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import cors from "cors";
dotenv.config();

const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors());
// Connect to the database
connectDB();

// Define your API routes
app.use("/api", apiRoutes);

// Start the server
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ succes: false, statusCode, message });
});
