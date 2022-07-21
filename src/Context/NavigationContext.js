import { createContext, useState } from "react";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [openComponent, setOpenComponent] = useState("");
  return (
    <NavigationContext.Provider value={{ openComponent, setOpenComponent }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
