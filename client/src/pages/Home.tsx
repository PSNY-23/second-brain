import React, { useState } from "react";
import MainPage from "../components/MainPage";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  console.log(selectedFilters);
  return (
    <>
      <div className="flex h-full bg-gray-95">
        <Sidebar
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
        />
        <MainPage selectedFilters={selectedFilters} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
