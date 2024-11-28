import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainPage from "../components/MainPage";

const Home: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
   console.log(selectedFilters)
  return (
    <div className="flex h-full bg-gray-950" style={{
      background: `linear-gradient(to bottom right, #63b3ed, #2b6cb0), url(${noiseSvg})`,
      backgroundSize: "cover",
      backgroundBlendMode: "multiply",
      filter: "contrast(200%) brightness(150%)",
    }}>
      <Sidebar setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
      <MainPage selectedFilters={selectedFilters} />
    </div>
  );
};

export default  Home;
