import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import CardEdit from "./CardEdit";

// Define CardData type
interface CardData {
  _id: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  fileType: string;
  imageUrl: string;
  tags?: string[];
  color?: string;
  createdAt: string; // Add createdAt to the type
  updatedAt: string; // Add updatedAt to the type
}

// Props type for AllCard component
interface AllCardProps {
  selectedFilters: string[];
}

const AllCard: React.FC<AllCardProps> = ({ selectedFilters }) => {
  const [inputUrl, setInputUrl] = useState<string>(""); // URL input state
  const [cards, setCards] = useState<CardData[]>([]); // Array to store the fetched cards
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state
  const [sortBy, setSortBy] = useState<string>("createdAt"); // State for sorting criteria (createdAt or updatedAt)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const editingCardData = useRef<CardData | null>(null);

  useEffect(() => {
    const fetchInitialCards = async () => {
      setLoading(true);
      try {
        const response = await axios.get<CardData[]>(
          "http://localhost:5000/api/cards"
        );
        let data = response.data.filter((card) => {
          // Apply filters based on selectedFilters
          const matchesFilters = selectedFilters.every((filter) => {
            if (
              filter === "github" ||
              filter === "google" ||
              filter === "twitter" ||
              filter === "link"
            ) {
              return card.domain.toLowerCase() === filter.toLowerCase();
            } else if (
              filter === "pdf" ||
              filter === "image" ||
              filter === "audio"
            ) {
              return card.fileType.toLowerCase() === filter.toLowerCase();
            } else if (filter === "blue") {
              return card.color === "#0000FF";
            } else {
              return card.tags?.includes(filter) ?? false;
            }
          });
          return matchesFilters;
        });

        // Sort the cards based on the sortBy state (createdAt or updatedAt)
        data = data.sort((a, b) => {
          const dateA = new Date(a[sortBy]).getTime();
          const dateB = new Date(b[sortBy]).getTime();
          return dateB - dateA; // Descending order
        });

        setCards(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cards");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialCards();
  }, [selectedFilters, sortBy]); // Dependency on selectedFilters and sortBy

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post<CardData>(
        "http://localhost:5000/api/cards/",
        { link: inputUrl }
      );
      setCards((prevCards) => [response.data, ...prevCards]);
      setInputUrl(""); // Clear the input field
    } catch (err) {
      console.error(err);
      setError("Failed to create a new card");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cardId: string): Promise<void> => {
    try {
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
      await axios.delete(`http://localhost:5000/api/cards/${cardId}`);
      alert("Card deleted successfully");
    } catch (err) {
      console.error("Failed to delete the card", err);
      alert("Error while deleting card");
    }
  };

  const handleEdit = (cardId: string): void => {
    const cardToEdit = cards.find((card) => card._id === cardId);
    if (!cardToEdit) {
      alert("Card not found");
      return;
    }
    editingCardData.current = cardToEdit;
    setIsOpen(true);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
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

      {/* Sorting options */}
<div className="mb-4 ml-20 flex flex-col gap-2">
  {/* Loading message is conditionally rendered to avoid layout shifting */}
  <div className={`transition-opacity duration-300 ${loading || error ? 'opacity-100' : 'opacity-0'}`}>
    {loading && <p className="text-blue-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
  </div>

  {/* Sorting dropdown */}
  <div className="flex items-center gap-2">
    <label className="mr-2">Sort by:</label>
    <select
      value={sortBy}
      onChange={handleSortChange}
      className="p-2 z-5 border rounded focus:outline-none"
    >
      <option value="createdAt">Created At</option>
      <option value="updatedAt">Updated At</option>
    </select>
  </div>
</div>


      <div className="flex gap-10 flex-wrap ml-20">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card._id}
              cardId={card._id}
              title={card.title}
              description={card.description}
              url={card.url}
              domain={card.domain}
              fileType={card.fileType}
              imageUrl={card.imageUrl}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>

      {isOpen && (
        <CardEdit
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCards={setCards}
          editingCardData={editingCardData.current!}
        />
      )}
    </div>
  );
};

export default AllCard;
