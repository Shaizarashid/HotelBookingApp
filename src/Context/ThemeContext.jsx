import React, { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

const ThemeContextProvider = (props) => {
    const [darkMode, setDarkMode] = useState(false); // Default to light mode

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
