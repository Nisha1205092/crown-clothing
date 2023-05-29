import { createContext, useState } from "react";

export const DARK = 'dark';
export const LIGHT = 'light';

export const ThemeContext = createContext({
    myTheme: '',
    setMyTheme: () => { }
});

export const MyThemeProvider = ({ children }) => {
    const [myTheme, setMyTheme] = useState(LIGHT);
    const value = { myTheme, setMyTheme };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}