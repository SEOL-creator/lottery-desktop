/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";

export default function SettingBar() {
    const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false);
    useEffect(() => {
        window.api.send("toggleAlwaysOnTop", isAlwaysOnTop);
    }, [isAlwaysOnTop]);
    return (
        <div
            css={css`
                width: 100%;
                height: 32px;
                box-sizing: border-box;
                position: absolute;
                bottom: 0;
                border-top: 1px solid var(--separator-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
            `}
        >
            <label
                css={css`
                    font-size: 14px;
                `}
            >
                항상 위에 표시
                <input
                    css={css`
                        vertical-align: bottom;
                    `}
                    type="checkbox"
                    checked={isAlwaysOnTop}
                    onChange={() => {
                        setIsAlwaysOnTop(!isAlwaysOnTop);
                    }}
                />
            </label>

            <ThemeSelector />
        </div>
    );
}
