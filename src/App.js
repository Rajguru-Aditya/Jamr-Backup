import Home from "./components/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Searchbar />
      <Home />
    </div>
  );
}

export default App;
