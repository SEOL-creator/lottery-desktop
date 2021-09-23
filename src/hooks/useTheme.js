import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export default function useTheme() {
    const { theme, setTheme } = useContext(ThemeContext);

    return [theme, setTheme];
}
