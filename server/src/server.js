
import app from "./app.js"; // Import the app instance
import connectToDatabase from "./services/db.js"; // Import database connection function

// Connect to the database
connectToDatabase();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

