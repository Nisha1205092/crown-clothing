import { useEffect, useCallback, useContext } from 'react';
import { LIGHT, DARK, ThemeContext } from '../../contexts/theme.context';

export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
};

export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
};


// Custom hook for handling theme logic
export const useTheme = () => {
    const { myTheme, setMyTheme } = useContext(ThemeContext);

    const handleThemeChange = useCallback((event) => {
        const newTheme = event.matches ? DARK : LIGHT;
        console.log(`Theme changed to ${newTheme}`);
        setMyTheme(newTheme);
        localStorage.setItem("themePreference", newTheme);
    }, [setMyTheme]);

    useEffect(() => {
        console.log('inside theme.utils-->useEffect');
        if (localStorage.themePreference) {
            console.log('getting user theme preference');
            setMyTheme(localStorage.themePreference);
        } else {
            const prefersDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            prefersDarkModeQuery.addEventListener("change", handleThemeChange);

            // this makes the theme according to system preference always
            handleThemeChange(prefersDarkModeQuery); // Initial theme check

            return () => {
                prefersDarkModeQuery.removeEventListener("change", handleThemeChange);
            };
        }

    }, [handleThemeChange, setMyTheme]);

    const themeToggler = () => {
        const newTheme = myTheme === LIGHT ? DARK : LIGHT;
        setMyTheme(newTheme);
        localStorage.setItem("themePreference", newTheme);
    };

    const setLightTheme = () => {
        setMyTheme(LIGHT);
        localStorage.setItem("themePreference", LIGHT);
    };

    const setDarkTheme = () => {
        setMyTheme(DARK);
        localStorage.setItem("themePreference", DARK);
    };

    return { myTheme, themeToggler, setLightTheme, setDarkTheme };
};