import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

// Define the type for the card data coming from the backend
interface CardData {
  title: string;
  description: string;
  imageUrl: string; // Assuming imageUrl is part of the card response
}

const AllCard: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>(""); // URL input state
  const [cards, setCards] = useState<CardData[]>([]); // Array to store the fetched cards
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Fetch the initial cards data from url1 when the component mounts
  useEffect(() => {
    const fetchInitialCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/cards"); // Replace with your url1 endpoint
        setCards(response.data);  // Set the fetched cards into state
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data from the URL1");
        setLoading(false);
      }
    };

    fetchInitialCards();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle the form submission to create a new card
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Send the input URL to the backend to create a new card (url2)
      const response = await axios.post("http://localhost:5000/api/cards/", {
        link: inputUrl,  // Send the URL to backend to create a new card
      });

      // Get the newly created card and add it to the state
      setCards((prevCards) => [response.data, ...prevCards]); // Add the new card at the start of the list
      setLoading(false);
      setInputUrl(""); // Clear the input field
    } catch (error) {
      setError("Failed to create a new card");
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex mb-5 ml-20 gap-4 w-1/2">
        <input
          type="url"
          placeholder="Enter URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-10 flex-wrap ml-20">
        {/* Render Card components dynamically based on fetched data */}
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl} // Assuming your API returns imageUrl
            />
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
};

export default AllCard;
