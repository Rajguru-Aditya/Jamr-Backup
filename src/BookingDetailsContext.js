import { createContext, useState } from "react";

const BookingDetailsContext = createContext();

export function BookingDetailsProvider({ children }) {
  const [details, setDetails] = useState({
    bookingDate: "",
    selectedSlots: [],
    totalPrice: 0,
    pricePerHour: 0,
    startTime: 0,
    endTime: 0,
    studioName: "",
    studioAddress: "",
  });
  const [transactionId, setTransactionId] = useState();
  return (
    <BookingDetailsContext.Provider
      value={{ details, setDetails, transactionId, setTransactionId }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
}

export default BookingDetailsContext;
