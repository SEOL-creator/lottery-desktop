import { useEffect, useState } from "react";

function getStorageTheme() {
    const storageData = localStorage.getItem("theme");
    if (!storageData) {
        localStorage.setItem("theme", "light");
    } else {
        return storageData;
    }
}

function getUserTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function useTheme() {
    const [currentTheme, setCurrentTheme] = useState(getStorageTheme());
    const [userTheme, setUserTheme] = useState(getUserTheme());

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
            if (e.matches) setUserTheme("dark");
            else setUserTheme("light");
        };
    }, []);

    function changeHTMLTheme(theme) {
        const html = document.querySelector("html");
        if (theme === "user") {
            html.dataset.theme = userTheme;
        } else {
            html.dataset.theme = theme;
        }
    }
    function changeStorageTheme(theme) {
        localStorage.setItem("theme", theme);
    }
    function changeTheme(theme) {
        changeHTMLTheme(theme);
        changeStorageTheme(theme);
    }

    useEffect(() => {
        switch (currentTheme) {
            case "user":
                changeTheme("user");
                break;
            case "dark":
                changeTheme("dark");
                break;
            case "light":
                changeTheme("light");
                break;
            default:
                setCurrentTheme("light");
        }
    }, [currentTheme, userTheme]);

    return [currentTheme, setCurrentTheme];
}
