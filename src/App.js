import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDetailsProvider } from "./UserDetailsContext";
import { BookingDetailsProvider } from "./BookingDetailsContext";
import { NavigationProvider } from "./NavigationContext";
import Searchbar from "./components/Searchbar/Searchbar";
import FilterBar from "./components/FilterBar/FilterBar";
import Home from "./Pages/Home/Home";
import StudioListing from "./Pages/StudioListing/StudioListing";
import JampadListing from "./Pages/JampadListing/JampadListing";
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
          <NavigationProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="studio-listing" element={<StudioListing />} />
                <Route path="jampad-listing" element={<JampadListing />} />
                <Route path="studio-details" element={<StudioDetails />} />
                <Route path="payment" element={<Payment />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </NavigationProvider>
        </BookingDetailsProvider>
      </UserDetailsProvider>
    </div>
  );
}

export default App;
