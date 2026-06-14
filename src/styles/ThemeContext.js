import React, { createContext } from 'react';

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode: () => {} }}>
    {children}
  </ThemeContext.Provider>
);
