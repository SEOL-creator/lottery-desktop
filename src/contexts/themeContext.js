import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function getStorageTheme() {
    const storageData = localStorage.getItem("theme");
    if (!storageData) {
        localStorage.setItem("theme", "light");
    } else {
        return storageData;
    }
}

function setHTMLTheme(theme, userTheme) {
    const html = document.querySelector("html");
    if (theme === "user") {
        html.dataset.theme = userTheme;
    } else {
        html.dataset.theme = theme;
    }
}

function getUserTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(getStorageTheme());
    const [userTheme, setUserTheme] = useState(getUserTheme());

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
            if (e.matches) setUserTheme("dark");
            else setUserTheme("light");
        };
    }, []);

    useEffect(() => {
        setHTMLTheme(theme, userTheme);
        localStorage.setItem("theme", theme);
    }, [theme, userTheme]);
    const context = {
        theme,
        setTheme,
    };
    return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeContextProvider };
