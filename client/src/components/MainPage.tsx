import Navbar from "./Navbar";
import AllCards from "./AllCards"
const MainPage = ({selectedFilters}) => {
  return (
      <div className="w-full">
          <Navbar />
      <AllCards selectedFilters={selectedFilters} />
          
    </div>
  )
}

export default MainPage