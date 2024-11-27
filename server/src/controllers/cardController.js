import Card from "../models/card.model.js";
import fetch from "node-fetch";
import puppeteer from "puppeteer";
import classifyUrl from "../services/classifyUrl.js";

// Function to get data from URL
async function getUrlData(url) {
  const key = "27d7498ae5de0c272c9009d59c3383f6"; // API key for linkpreview
  const data = { q: url }; // Data for the LinkPreview API

  try {
    // Fetch data from the LinkPreview API
    const linkPreviewResponse = await fetch("https://api.linkpreview.net", {
      method: "POST",
      headers: {
        "X-Linkpreview-Api-Key": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const linkPreviewData = await linkPreviewResponse.json();
    const { domain, fileType } = classifyUrl(url);

    // Fetch screenshot using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); // Navigate to the URL
    await page.waitForSelector("img"); // Ensure images are loaded

    // Take a screenshot of the full page
    const screenshotArrayBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    // Return the response data with image URL and screenshot
    return {
      title: linkPreviewData.title || "No title available",
      description: linkPreviewData.description || "No description available",
      url: linkPreviewData.url || url,
      domain: domain,
      fielType: fileType,
      imageUrl: linkPreviewData.image || "no image url", // Storing only the image URL
      screenshot: Buffer.from(screenshotArrayBuffer), // Storing screenshot as Buffer
    };
  } catch (error) {
    console.error("Error fetching data from URL:", error);
    throw new Error("Failed to fetch URL data or generate screenshot");
  }
}

// Create a new card
const createCard = async (req, res) => {
  const { link } = req.body;

  // Ensure a URL is provided
  if (!link) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    // Fetch URL data (title, description, imageUrl, screenshot)
    const data = await getUrlData(link); // Get URL data

    // Create new card based on the fetched data
    const card = new Card({
      title: data.title,
      description: data.description,
      url: data.url,
      domain: data.domain,
      fileType: data.fielType,
      imageUrl: data.imageUrl, // Save image URL, not the image itself
      user: req.user.id, // Assuming the user is authenticated and `req.user.id` contains the user's ID
      screenshot: data.screenshot, // Save the screenshot as Buffer
    });

    // Save the card to the database
    await card.save();

    // Return the created card in the response
    res.status(201).json(card);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all cards of the authenticated user
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id });

    // Convert screenshot buffer to base64 for easier handling in the response
    const responseCards = cards.map((card) => ({
      ...card.toObject(),
      screenshot: card.screenshot.toString("base64"), // Convert screenshot to base64 string
      imageUrl: card.imageUrl, // No need to convert the imageUrl
    }));

    res.json(responseCards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a card by ID
const deleteCard = async (req, res) => {
  try {
    // Find the card by ID
    const card = await Card.findById(req.params.id);

    // Check if the card exists
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Check if the authenticated user is the owner of the card
    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete the card from the database
    await Card.findByIdAndDelete(req.params.id);

    // Send response back
    res.json({ message: "Card deleted" });
  } catch (error) {
    console.error("Error deleting card:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

// Update a card by ID
const updateCard = async (req, res) => {
  console.log("updaitng req, recevied");
  const { title, description, tags, color } = req.body;
  try {
    const card = await Card.findById(req.params.id);
     
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (card.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    card.title = title || card.title;
    card.description = description || card.description;
    card.tags = tags || card.tags || null;
    card.color = color || card.color || null;
     console.log("card hasn't been saved")
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createCard, getCards, deleteCard, updateCard };
