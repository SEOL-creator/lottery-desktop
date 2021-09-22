/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const RestoreWindowIcon = () => {
    const boxCSS = css`
        width: 8px;
        height: 8px;
        box-sizing: border-box;
        border: 1px solid var(--titlebar-button-icon);
        border-width: 1px;
        position: absolute;
        background-color: var(--titlebar-background);
    `;

    return (
        <div
            css={css`
                width: 10px;
                height: 10px;
                position: relative;
            `}
        >
            <div css={boxCSS} style={{ left: "0px", bottom: "0px", zIndex: "2" }}></div>
            <div css={boxCSS} style={{ right: "0px", top: "0px" }}></div>
        </div>
    );
};

const SegoeMDL2CloseIcon = () => {
    return (
        <div
            css={css`
                width: 1.4rem;
                height: 1.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 10px;
                font-family: "Segoe MDL2 Assets";
                transition: color 0.15s;
            `}
        >
            {String.fromCharCode("57606")}
        </div>
    );
};

export default function TitleBar({ title }) {
    const TitleBarContainer = styled.div`
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-app-region: drag;
        -webkit-user-select: none;
        position: fixed;
        top: 0;
        z-index: 100;
        background-color: var(--titlebar-background);
        transition: background-color 0.15s;
    `;

    const IconContainer = styled.div`
        width: 13.5rem;
    `;
    const TitleContainer = styled.div`
        font-size: 1.2rem;
        color: var(--titlebar-text);
    `;
    const ButtonContainer = styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `;
    const Button = styled.button`
        width: 4.5rem;
        height: 3rem;
        box-sizing: border-box;
        font-size: 1.6rem;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--titlebar-background);
        color: var(--titlebar-button-icon);
        -webkit-app-region: no-drag;
        &:hover {
            background-color: var(--titlebar-button-hover);
        }

        transition: background-color 0.15s;
        & * {
            transition: all 0.15s;
        }
    `;

    const MinimizeIcon = styled.div`
        width: 1.2rem;
        height: 1px;
        background-color: var(--titlebar-button-icon);
    `;

    const MaximizeIcon = styled.div`
        width: 10px;
        height: 10px;
        box-sizing: border-box;
        border: 1px solid var(--titlebar-button-icon);
    `;

    const [isWindowMaximized, setIsWindowMaximized] = useState(false);

    useEffect(() => {
        window.api.receive("isWindowMaximized", (payload) => {
            console.log(payload);
            setIsWindowMaximized(payload);
        });
    }, []);

    console.log("isWindowMaximized", isWindowMaximized);

    return (
        <TitleBarContainer>
            <IconContainer></IconContainer>
            <TitleContainer>{title}</TitleContainer>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        window.api.send("minimizeWindow");
                    }}
                >
                    <MinimizeIcon />
                </Button>
                <Button
                    css={css`
                        &:hover > div > div {
                            background-color: var(--titlebar-button-hover);
                        }
                    `}
                    onClick={() => {
                        window.api.send("maximizeWindow");
                    }}
                >
                    {isWindowMaximized ? <RestoreWindowIcon /> : <MaximizeIcon />}
                </Button>
                <Button
                    css={css`
                        color: var(--titlebar-button-icon);
                        &:hover {
                            background-color: #da0f20;
                            color: var(--titlebar-button-close-hover);
                        }
                    `}
                    onClick={() => {
                        window.api.send("closeWindow");
                    }}
                >
                    <SegoeMDL2CloseIcon />
                </Button>
            </ButtonContainer>
        </TitleBarContainer>
    );
}
