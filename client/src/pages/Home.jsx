import React from "react";
import Sidebar from "../components/Sidebar"
import MainPage from "../components/MainPage"
const Home = () => {
  return (
    <div className="flex">
          <Sidebar />
          <MainPage/>
    </div>
  );
};

export default Home;
