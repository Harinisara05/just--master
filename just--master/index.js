import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import contactRoutes from "./routes/contacts.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);

// Ensure PORT and MONGO_URI are defined
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  });
