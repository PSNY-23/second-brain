import { FaRegFileAlt } from "react-icons/fa";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import { IoLink } from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia";
import { RiBrainLine } from "react-icons/ri";

const sidebar = () => {
  return (
    <div className="min-h-screen min-w-80 border border-r-2 border-gray-300 py-5  text-black px-6">
      <div className="flex pl-2 text-2xl gap-2 items-center">
        <div className="flex items-center">
          <RiBrainLine className="text-darkBlue text-4xl font-bold" />
        </div>
        <div className="font-bold ">Second Brain</div>
      </div>
      <div className="px-10 pt-10 flex flex-col gap-5 font-semibold text-md">
        <div>
          <a href="#" className="flex items-center gap-4">
            <FiTwitter />
            Tweets
          </a>
        </div>
        <div>
          <a href="#" className="flex items-center gap-4">
            <FiYoutube />
            Videos
          </a>
        </div>
        <div>
          <a href="#" className="flex items-center gap-4">
            <FaRegFileAlt />
            Documents
          </a>
        </div>
        <div>
          <a href="#" className="flex items-center gap-4">
            <IoLink />
            Links
          </a>
        </div>
        <div>
          <a href="#" className="flex items-center gap-4">
            <LiaHashtagSolid />
            Tags
          </a>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
