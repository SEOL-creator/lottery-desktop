/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import styles from "./Titlebar.module.css";
import icon from "../assets/icons/icon_o_1024.png";

export default function TitleBar({ title }) {
    const [isWindowMaximized, setIsWindowMaximized] = useState(false);
    const [isWindowBlur, setIsWindowBlur] = useState(false);

    useEffect(() => {
        const callback = (payload) => {
            setIsWindowMaximized(payload);
        };
        window.api.on("isWindowMaximized", callback);

        return () => window.api.removeListener("isWindowMaximized", callback);
    }, []);
    useEffect(() => {
        const callback = (payload) => {
            setIsWindowBlur(payload);
        };
        window.api.on("isWindowBlur", callback);

        return () => window.api.removeListener("isWindowBlur", callback);
    }, []);

    const WindowSizeIcon = (isWindowMaximized) => {
        if (isWindowMaximized) {
            return (
                <div className={styles.restoreWindowIcon}>
                    <div></div>
                    <div></div>
                </div>
            );
        } else {
            return <div className={styles.maximizeWindowIcon}></div>;
        }
    };

    return (
        <div className={`${styles.titlebar} ${isWindowBlur ? styles.appBlurTitlebar : ""}`}>
            <div className={styles.iconContainer}>
                <img src={icon} alt="" />
            </div>
            <div className={styles.titleContainer}>{title}</div>
            <div className={styles.buttonContainer}>
                <button
                    onClick={() => {
                        window.api.send("minimizeWindow");
                    }}
                >
                    <div className={styles.minimizeIcon}></div>
                </button>
                <button
                    className={styles.maximizeButton}
                    onClick={() => {
                        window.api.send("maximizeWindow");
                    }}
                >
                    {WindowSizeIcon(isWindowMaximized)}
                </button>
                <button
                    className={styles.closeButton}
                    onClick={() => {
                        window.api.send("closeWindow");
                    }}
                >
                    <div className={styles.segoeMDL2CloseIcon}>{String.fromCharCode("57606")}</div>
                </button>
            </div>
        </div>
    );
}
