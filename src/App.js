import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDetailsProvider } from "./Context/UserDetailsContext";
import { BookingDetailsProvider } from "./Context/BookingDetailsContext";
import { NavigationProvider } from "./Context/NavigationContext";
import { SortingProvider } from "./Context/SortingContext";
import { WithFilterBar } from "./components/FilterBarStatus/WithFilterBar";
import { WithoutFilterBar } from "./components/FilterBarStatus/WithoutFilterBar";
import Home from "./Pages/Home/Home";
import StudioListing from "./Pages/StudioListing/StudioListing";
import JampadListing from "./Pages/JampadListing/JampadListing";
import StudioDetails from "./Pages/StudioDetails/StudioDetails";
import Payment from "./Pages/Payment/Payment";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Login from "./Pages/Login/Login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="app">
      <UserDetailsProvider>
        <BookingDetailsProvider>
          <SortingProvider>
            <NavigationProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route element={<WithoutFilterBar />}>
                    <Route ecaxt path="/" element={<Home />} />
                  </Route>
                  <Route element={<WithFilterBar />}>
                    <Route path="studio-listing" element={<StudioListing />} />
                  </Route>
                  <Route element={<WithFilterBar />}>
                    <Route path="jampad-listing" element={<JampadListing />} />
                  </Route>
                  <Route element={<WithoutFilterBar />}>
                    <Route path="studio-details" element={<StudioDetails />} />
                  </Route>
                  <Route element={<WithoutFilterBar />}>
                    <Route path="payment" element={<Payment />} />
                  </Route>
                  <Route element={<WithoutFilterBar />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                  </Route>
                  <Route element={<WithoutFilterBar />}>
                    <Route path="order-history" element={<OrderHistory />} />
                  </Route>
                  <Route element={<WithoutFilterBar />}>
                    <Route path="login" element={<Login />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </NavigationProvider>
          </SortingProvider>
        </BookingDetailsProvider>
      </UserDetailsProvider>
    </div>
  );
}

export default App;
