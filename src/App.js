import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Searchbar from "./components/Searchbar/Searchbar";
import FilterBar from "./components/FilterBar/FilterBar";
import Home from "./Pages/Home/Home";
import StudioListing from "./Pages/StudioListing/StudioListing";
import StudioDetails from "./Pages/StudioDetails/StudioDetails";
import Payment from "./Pages/Payment/Payment";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Searchbar /> */}
      {/* <FilterBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="studio-listing" element={<StudioListing />} />
          <Route path="studio-details" element={<StudioDetails />} />
          <Route path="payment" element={<Payment />} />
          <Route path="UserDashboard" element={<UserDashboard />} />
          <Route path="UserDashboard" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
