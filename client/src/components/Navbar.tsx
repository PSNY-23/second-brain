import { CiShare2 } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  

  return (
    <div className="py-10 px-10 flex justify-between items-center">
      <h1 className="text-black font-bold text-3xl">All Notes</h1>
      <div className="flex justify-between items-center gap-4">
        
        <button className="text-darkBlue bg-lightBlue flex items-center gap-2 px-3 py-2 rounded-md text-lg font-semibold">
          <CiShare2 className="text-3xl" />
          Share Brain
        </button>
        <button className="text-white bg-darkBlue flex items-center gap-2 px-3 py-2 rounded-md text-lg">
          <IoMdAdd className="" />
          Add Content
        </button>
      </div>
    </div>
  );
};

export default Navbar;
