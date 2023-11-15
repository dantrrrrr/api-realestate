import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to the database
connectDB();

// Define your API routes
app.use("/api", apiRoutes);

// Start the server
const port = process.env.PORT || 3000;
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
