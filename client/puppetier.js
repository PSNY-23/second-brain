// import puppeteer from 'puppeteer';
// import fs from "fs"


// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://en.wikipedia.org/wiki/Shivaji'); 1
//   await page.waitForSelector('img'); // Wait for images to load
//   const screenshot = await page.screenshot({ fullPage: true }); // Capture full page
//   await browser.close();

//   fs.writeFileSync('screenshot.png', screenshot);
// })();


import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getUrlData(url) {
  const key = "27d7498ae5de0c272c9009d59c3383f6";  // API key for linkpreview
  const data = { q: url };  // Data for the LinkPreview API

  // Step 1: Fetch data from the LinkPreview API
  const linkPreviewResponse = await fetch('https://api.linkpreview.net', {
    method: 'POST',
    headers: {
      'X-Linkpreview-Api-Key': key,
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });

  const linkPreviewData = await linkPreviewResponse.json();

  // Step 2: Fetch screenshot using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);  // Navigate to the URL

  // Wait for the page to load and render images
  await page.waitForSelector('img'); 
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();

  // Generate a unique file name for the screenshot (using timestamp or random string)
  const screenshotFileName = `screenshot_${Date.now()}.png`;
  const screenshotFilePath = path.join(__dirname, screenshotFileName);

  // Save the screenshot
  fs.writeFileSync(screenshotFilePath, screenshot);

  // Step 3: Assemble the response data
  const responseData = {
    title: linkPreviewData.title || 'No title available',
    description: linkPreviewData.description || 'No description available',
    image: linkPreviewData.image || 'No image available',
    url: linkPreviewData.url || url,
    screenshotPath: screenshotFilePath,  // The file path where the screenshot is saved
  };

  // Return the assembled response
  return responseData;
}

// Example Usage
getUrlData('https://en.wikipedia.org/wiki/Shivaji')
  .then(data => {
    console.log('Assembled Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
