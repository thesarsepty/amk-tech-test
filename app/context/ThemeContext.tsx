import React, { createContext, useState, ReactNode } from "react";

interface IThemeContextProps {
  isDarkMode: boolean;
  toggleChangeTheme: () => void;
}

const defaultThemeContext: IThemeContextProps = {
  isDarkMode: false,
  toggleChangeTheme: () => {},
};

export const ThemeContext = createContext(defaultThemeContext);

interface IThemeProvider {
  children: ReactNode;
}

const ThemeContextProvider: React.FC<IThemeProvider> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleChangeTheme = () => {
    console.log("masuk");
    setIsDarkMode(!isDarkMode);
  };

  console.log(isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
