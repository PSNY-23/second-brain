import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainPage from "../components/MainPage";

const Home: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
   console.log(selectedFilters)
  return (
    <div className="flex">
      <Sidebar setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
      <MainPage selectedFilters={selectedFilters} />
    </div>
  );
};

export default Home;
