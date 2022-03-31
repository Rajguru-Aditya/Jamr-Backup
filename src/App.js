import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import FilterBar from "./components/FilterBar/FilterBar";
import Home from "./Pages/Home/Home";
import StudioListing from "./Pages/StudioListing/StudioListing";
import StudioDetails from "./Pages/StudioDetails/StudioDetails";
import Payment from "./Pages/Payment/Payment";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Searchbar />
      {/* <Home /> */}
      <StudioListing />
      {/* <StudioDetails /> */}
      {/* <FilterBar /> */}
      {/* <Payment /> */}
    </div>
  );
}

export default App;
