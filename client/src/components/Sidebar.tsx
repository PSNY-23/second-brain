import { Dispatch, SetStateAction, useState } from "react";
import { FaRegFileAlt, FaGithub } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { IoLink } from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia";
import { RiBrainLine } from "react-icons/ri";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdInvertColors } from "react-icons/md";



interface SidebarProps {
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedFilters, setSelectedFilters }) => {
  const [isFileTypeOpen, setFileTypeOpen] = useState(false);
  const [isTagOpen, setTagOpen] = useState(false);
  const [isColorOpen, setColorOpen] = useState(false);
  
  

  const [customTags, setCustomTags] = useState<string[]>([
    "productivity",
    "tech",
  ]);
  const [customColors, setCustomColors] = useState<
    { name: string; color: string }[]
  >([
    { name: "Blue", color: "#1DA1F2" },
    { name: "Red", color: "#FF0000" },
    { name: "Pink", color: "#E4405F" },
  ]);

  const [newTag, setNewTag] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColor, setNewColor] = useState("#000000");

  // Add or remove filters from selectedFilters
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(filter)
        ? prev.filter((item) => item !== filter) // Remove filter
        : [...prev, filter]; // Add filter
      setSelectedFilters(updatedFilters); 
      return updatedFilters;
    });
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setCustomTags([...customTags, newTag]);
      setNewTag("");
    }
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setCustomColors([
        ...customColors,
        { name: newColorName, color: newColor },
      ]);
      setNewColorName("");
      setNewColor("#000000");
    }
  };

  return (
    <div className="min-h-screen h-full min-w-80 border py-5 text-black px-6">
      <div className="flex pl-2 text-2xl gap-2 items-center">
        <div className="flex items-center">
          <RiBrainLine className="text-darkBlue text-4xl font-bold" />
        </div>
        <div className="font-bold">Second Brain</div>
      </div>
      <div className="px-10 pt-10 flex flex-col gap-5 font-semibold text-md">
        {/* Domain Filters */}
        <div className="">
          <a
            href="#"
            onClick={() => setSelectedFilters([])}
            className={`flex items-center gap-4 text-bold text-md  ${selectedFilters.length === 0 ? 'text-blue-500' : ''}`}

          >
             All
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() => setSelectedFilters(["github"])}
            className={`flex items-center gap-4 ${
              selectedFilters.includes("github") ? "text-blue-500" : ""
            }`}
          >
            <FaGithub /> GitHub
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() => setSelectedFilters(["youtube"])}
            className={`flex items-center gap-4 ${
              selectedFilters.includes("youtube") ? "text-blue-500" : ""
            }`}
          >
            <FiYoutube /> YouTube
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() => setSelectedFilters(["twitter"])}
            className={`flex items-center gap-4 ${
              selectedFilters.includes("twitter") ? "text-blue-500" : ""
            }`}
          >
            <FaSquareXTwitter /> X.com
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() => setSelectedFilters(["link"])}
            className={`flex items-center gap-4 ${
              selectedFilters.includes("link") ? "text-blue-500" : ""
            }`}
          >
            <IoLink /> Links
          </a>
        </div>

        {/* File Types */}
        <div>
          <button
            onClick={() => setFileTypeOpen(!isFileTypeOpen)}
            className="flex items-center justify-between gap-4 w-full"
          >
            <div className="flex items-center gap-2">
              <FaRegFileAlt /> File Types
            </div>
            <div className="flex items-center">
              {isFileTypeOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
          </button>
          {isFileTypeOpen && (
            <div className="pl-8 mt-2 flex flex-col gap-2">
              {["pdf", "image", "audio"].map((fileType) => (
                <a
                  key={fileType}
                  href="#"
                  onClick={() => toggleFilter(fileType)}
                  className={`flex items-center gap-4 ${
                    selectedFilters.includes(fileType) ? "text-blue-500" : ""
                  }`}
                >
                  {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <button
            onClick={() => setTagOpen(!isTagOpen)}
            className="flex items-center justify-between gap-4 w-full"
          >
            <div className="flex items-center gap-2">
              <LiaHashtagSolid /> Tags
            </div>
            <div className="flex items-center">
              {isTagOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
          </button>
          {isTagOpen && (
            <div className="pl-8 mt-2 flex flex-col gap-2">
              {customTags.map((tag, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={() => toggleFilter(tag)}
                  className={`flex items-center gap-4 ${
                    selectedFilters.includes(tag) ? "text-blue-500" : ""
                  }`}
                >
                  {tag}
                </a>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom tag"
                className="border p-2 mt-2"
              />
              <button onClick={handleAddTag} className="mt-2 text-blue-500">
                Add Tag
              </button>
            </div>
          )}
        </div>

        {/* Colors */}
        <div>
          <button
            onClick={() => setColorOpen(!isColorOpen)}
            className="flex items-center justify-between gap-4 w-full"
          >
            <div className="flex items-center gap-2">
              <MdInvertColors /> Colors
            </div>
            <div className="flex items-center">
              {isColorOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
          </button>
          {isColorOpen && (
            <div className="pl-8 mt-2 flex flex-col gap-2">
              {customColors.map((color, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={() => toggleFilter(color.color)}
                  className={`flex items-center gap-4 ${
                    selectedFilters.includes(color.color) ? "text-blue-500" : ""
                  }`}
                >
                  <div
                    style={{ backgroundColor: color.color }}
                    className="w-4 h-4 rounded-full"
                  />
                  {color.name}
                </a>
              ))}
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color Name"
                className="border p-2 mt-2"
              />
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="border p-2 mt-2"
              />
              <button onClick={handleAddColor} className="mt-2 text-blue-500">
                Add Color
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
