import { createContext, ReactNode, useContext, useState } from "react";

export type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const initTheme = (localStorage.getItem("theme") as ThemeType) || "light";

export const ThemeContext = createContext<ThemeContextType>({
  theme: initTheme,
  toggleTheme: () => {},
});

export const useThemeState = (): [ThemeType, () => void] => {
  const [theme, setTheme] = useState<ThemeType>(initTheme);

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));
  };
  localStorage.setItem("theme", theme);
  return [theme, toggleTheme];
};

const ThemeProvider = ({
  children,
  toggleTheme,
  theme,
}: {
  children: ReactNode;
  toggleTheme: () => void;
  theme: ThemeType;
}) => {
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
