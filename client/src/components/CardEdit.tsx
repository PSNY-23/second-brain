import { useState } from "react";
import axios from "axios";

interface CardData {
  _id: string; // Assuming MongoDB ObjectId is a string
  title: string;
  description: string;
  url: string;
  domain: string;
  fileType: string;
  imageUrl: string;
  tags?: string[]; // Optional array of strings
  color?: string; // Optional hex color code
}

interface CardEditProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editingCardData: CardData;
  setEditingCardData: (cardData: CardData) => void;
  setCards: (update: (prev: CardData[]) => CardData[]) => void; // Corrected this line
  cards: CardData[];
}

const CardEdit: React.FC<CardEditProps> = ({
  isOpen,
  setIsOpen,
  editingCardData,

  setCards,
}) => {
  const [cardData, setCardData] = useState<CardData>({
    ...editingCardData,
    tags: editingCardData.tags || [],
    color: editingCardData.color || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof CardData
  ): void => {
    const value = e.target.value;
    if (fieldName === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setCardData((prevData) => ({
        ...prevData,
        tags: tagsArray, // Update tags field with array
      }));
    } else {
      setCardData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      // Extract only the required fields for the backend
      const { title, description, tags, color } = cardData;
      
      // Prepare the payload to match backend expectations
      const payload = {
        title,
        description,
        tags: tags  || null, // Convert tags array to comma-separated string
        color: color || null,
      };
      console.log(payload)
      // Update the card in the backend
      await axios.put(
        `http://localhost:5000/api/cards/${cardData._id}`,
        payload
      );

      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardData._id ? { ...card, ...cardData } : card
        )
      );
      // Close the modal
      setIsOpen(false);

      // Optionally, trigger a callback to re-fetch the cards from the parent
      // Example: refetchCards(); (you can pass this as a prop from the parent)
    } catch (err) {
      console.error(err);
      alert("Failed to update the card");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white  p-6 rounded-lg shadow-lg w-1/2 h-2/3 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Card</h2>

        {/* Title input */}
        <input
          type="text"
          value={cardData.title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description input */}
        <textarea
          value={cardData.description}
          onChange={(e) => handleChange(e, "description")}
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        {/* Tags input */}
        <input
          type="text"
          value={cardData.tags ? cardData.tags.join(", "): ""} // Show tags as comma-separated
          onChange={(e) => handleChange(e, "tags")}
          placeholder="Tags (comma separated)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        

        {/* Color input */}
        <div className="flex items-center gap-2">
          <label htmlFor="color" className="font-medium text-gray-700">
            Color
          </label>
          <input
            type="color"
            value={cardData.color}
            onChange={(e) => handleChange(e, "color")}
            className="w-8 h-8 border rounded-md"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
