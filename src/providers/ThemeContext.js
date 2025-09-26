import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import baseColors from "../theme/colors";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");

  const toggleTheme = () => {
    setTheme((value) => (value === "light" ? "dark" : "light"));
  };

  const overrides = {
    light: {
      background: "#F5F5F5",
      text: "#000",
      placeholder: "#555",
    },
    dark: {
      background: "#121212",
      text: "#fff",
      placeholder: "#aaa",
    },
  };

  const themeColors = {
    ...baseColors,
    ...overrides[theme],
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}