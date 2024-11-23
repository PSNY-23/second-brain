import mongoose from "mongoose";
import DB_URI from "../config/dbConfig.js"

const MONGO_URI = DB_URI;
console.log(MONGO_URI)

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    // Try to connect to MongoDB using mongoose
    await mongoose.connect(MONGO_URI);

    console.log("Successfully connected to the database!");
  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1);  // Exit process with failure
  }
};



export default connectToDatabase;
