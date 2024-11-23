import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    url: {
      type: String,
    },
    imageUrl: {
      type: String,
    },

    screenshot: {
      // Store screenshot as a binary buffer
      type: Buffer,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model to associate the card with a user
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
