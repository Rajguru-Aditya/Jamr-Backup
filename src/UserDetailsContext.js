import { createContext, useState } from "react";

const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {
  const [ids, setIds] = useState({
    userId: "",
    studioId: "",
  });
  return (
    <UserDetailsContext.Provider value={{ ids, setIds }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default UserDetailsContext;
