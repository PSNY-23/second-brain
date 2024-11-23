// src/routes/cardRoutes.js
import express from "express";
import { createCard, getCards, deleteCard, updateCard } from "../controllers/cardController.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protect card routes with JWT
router.use(protect);

router.post("/cards", createCard);
router.get("/cards", getCards);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:id", updateCard);

export default router;
