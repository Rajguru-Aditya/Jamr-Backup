import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDetailsProvider } from "./UserDetailsContext";
import { BookingDetailsProvider } from "./BookingDetailsContext";
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
      <Searchbar />
      {/* <FilterBar /> */}
      <UserDetailsProvider>
      <BookingDetailsProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="studio-listing" element={<StudioListing />} />
            <Route path="studio-details" element={<StudioDetails />} />
            <Route path="payment" element={<Payment />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        </BookingDetailsProvider>
      </UserDetailsProvider>
    </div>
  );
}

export default App;
