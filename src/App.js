import Home from "./components/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import StudioListing from "./components/StudioListing/StudioListing";
import FilterBar from "./components/FilterBar/FilterBar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Searchbar />
      {/* <Home /> */}
      <StudioListing />
      <FilterBar />
    </div>
  );
}

export default App;
