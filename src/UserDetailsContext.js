import { createContext, useState } from "react";

const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    userId: "5",
    studioId: "",
  });
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default UserDetailsContext;
