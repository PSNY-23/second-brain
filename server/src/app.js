import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", cardRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, welcome to the Express server with TypeScript!");
});

export default app;
