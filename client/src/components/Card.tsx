import { CiShare2 } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";

import Icon from "./Icon"; // Import the Icon component
import Tag from "./Tag";
import { getDate } from "../utils/date.tsx";

interface CardProps {
  cardId: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  fileType: string;
  imageUrl: string;
  tags?: string[]; // Optional tags
  color?: string; // Optional color
  handleDelete: (cardId: string) => Promise<void>;
  handleEdit: (cardId: string) => void; // Removed Promise since it's not awaited in use
}

const Card: React.FC<CardProps> = ({
  cardId,
  title,
  description,
  url,
  domain,
  fileType,
  imageUrl,
  tags,
  color,

  handleDelete,
  handleEdit,
}) => {
  return (
    <div
      className="relative h-80 w-80 border-2 rounded-lg p-5 flex flex-col justify-between shadow-md"
      style={{ borderColor: color || "#d1d5db" }}
    >
      <div className="flex justify-between text-xl  mb-2">
        <div>
          <a href="#" className="" style={{ color: "initial" }}>
            <Icon domain={domain} fileType={fileType} />
          </a>
        </div>
        <div className="flex gap-5 text-gray-400">
          <a href="#" className="hover:text-darkBlue">
            <CiShare2 />
          </a>

          <a
            href="#"
            className="hover:text-darkBlue"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(cardId);
            }}
          >
            <RiDeleteBin5Line />
          </a>
          <a
            href="#"
            className="hover:text-darkBlue"
            onClick={(e) => {
              e.preventDefault();
              handleEdit(cardId);
            }}
          >
            <RiEditFill />
          </a>
        </div>
      </div>

      <div className="flex-grow overflow-hidden flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {/* Image */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-32 rounded-lg object-scale-down"
          />

          {/* Title */}
          <h3 className="font-semibold text-lg text-black truncate">{title}</h3>

          {/* Description */}
          <p className="text-gray-700 text-sm truncate">{description}</p>
        </div>
      </div>

      <div className="bottom-0 flex flex-col gap-1 text-sm">
        <div className="w-full flex gap-1 items-center flex-around">
          {tags?.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}

          <span className="text-darkBlue">
            <a href={url}>link</a>
          </span>
        </div>

        <p className="text-black text-xs">{`Added on ${getDate()}`}</p>
      </div>
    </div>
  );
};

export default Card;
