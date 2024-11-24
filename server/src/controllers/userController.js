// src/controllers/userController.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Register a new user
const signUp = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    console.log(userExists)
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();
    console.log("user db me save hua")


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("user ka token ban chuka hai")

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Sign in an existing user
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { signUp, signIn };
