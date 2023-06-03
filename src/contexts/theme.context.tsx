import { createContext, useState, FC, ReactNode } from "react";

export const DARK = 'dark';
export const LIGHT = 'light';

export type ThemeContextType = {
    myTheme: string;
    setMyTheme: (theme: string) => void;
}
export const ThemeContext = createContext<ThemeContextType>({
    myTheme: '',
    setMyTheme: () => { }
});

type MyThemeProviderProps = {
    children: ReactNode;
}

export const MyThemeProvider: FC<MyThemeProviderProps> = ({ children }) => {
    const [myTheme, setMyTheme] = useState(LIGHT);
    const value = { myTheme, setMyTheme };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}