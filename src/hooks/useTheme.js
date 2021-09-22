import { useEffect, useState } from "react";

function getUserTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function changeHTMLTheme(theme) {
    const html = document.querySelector("html");
    html.dataset.theme = theme;
}

export default function useTheme() {
    const [currentTheme, setCurrentTheme] = useState("light");
    const [userTheme, setUserTheme] = useState(getUserTheme());

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
            if (e.matches) setUserTheme("dark");
            else setUserTheme("light");
        };
    }, []);

    useEffect(() => {
        switch (currentTheme) {
            case "user":
                changeHTMLTheme(userTheme);
                break;
            case "dark":
                changeHTMLTheme("dark");
                break;
            case "light":
                changeHTMLTheme("light");
                break;
            default:
                changeHTMLTheme("light");
                setCurrentTheme("light");
        }
    }, [currentTheme, userTheme]);

    return [currentTheme, setCurrentTheme];
}
