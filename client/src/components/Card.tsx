import { CiShare2 } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Tag from "./Tag";
import { getDate } from "../utils/date.tsx";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="relative h-80 w-80 border-2 border-gray-300 rounded-lg p-5 flex flex-col justify-between shadow-md">
      <div className="flex justify-between text-xl text-gray-400">
        <div>
          <a href="#" className="hover:text-darkBlue">
            <FiYoutube />
          </a>
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-darkBlue">
            <CiShare2 />
          </a>
          <a href="#" className="hover:text-darkBlue">
            <RiDeleteBin5Line />
          </a>
        </div>
      </div>

      <div className="flex-grow overflow-hidden flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {/* Image */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-32 object-cover rounded-lg"
          />
          
          {/* Title */}
          <h3 className="font-semibold text-lg text-black truncate">{title}</h3>
          
          {/* Description */}
          <p className="text-gray-700 text-sm truncate">{description}</p>
        </div>
      </div>

      <div className="bottom-5 flex flex-col gap-1 text-sm">
        <Tag />
        <p className="text-black">{`Added on ${getDate()}`}</p>
      </div>
    </div>
  );
};

export default Card;
