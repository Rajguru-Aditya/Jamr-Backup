import { createContext, useState } from "react";

const SortingContext = createContext();

export function SortingProvider({ children }) {
  const [sortOrder, setSortOrder] = useState(null);
  return (
    <SortingContext.Provider value={{ sortOrder, setSortOrder }}>
      {children}
    </SortingContext.Provider>
  );
}

export default SortingContext;
