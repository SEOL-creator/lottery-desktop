import useTheme from "../hooks/useTheme";

export default function ThemeSelector(props) {
    const [theme, setTheme] = useTheme();

    return (
        <select
            className={props.className}
            value={theme}
            onInput={(e) => {
                setTheme(e.target.value);
            }}
        >
            <option value="user">자동</option>
            <option value="light">밝은 화면</option>
            <option value="dark">어두운 화면</option>
        </select>
    );
}
