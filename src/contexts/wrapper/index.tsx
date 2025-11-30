import { createContext, ReactNode, useContext } from "react";

type ThemeContextType = {};
const WrapperContext = createContext<ThemeContextType | undefined>(undefined);
export function useWrapper() {
  return useContext(WrapperContext);
}

export function WrapperProvider({ children }: { children: ReactNode }) {
  return (
    <WrapperContext.Provider value={{}}>{children}</WrapperContext.Provider>
  );
}
