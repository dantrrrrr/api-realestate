import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { corsOptions } from "./utils/cors.js";
import { swaggerDocs } from "./utils/swagger.js";
dotenv.config();
const port = process.env.PORT || 3333;

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());
//cors
app.use(cors(corsOptions));
//cookieParser

app.use(cookieParser());
// Connect to the database
connectDB();
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://your-frontend-app.com");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
// Define your API routes
app.use("/api", apiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Start the server
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
