/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import styles from "./App.module.css";

import TitleBar from "../components/TitleBar";
import LotteryMain from "./LotteryMain";
import LotteryResult from "./LotteryResult";
import SettingBar from "../components/SettingBar";

import { ThemeContextProvider } from "../contexts/themeContext";

function App() {
    const [title, setTitle] = useState("뽑기기계");
    const [lotteryState, setLotteryState] = useState({ onLottery: false, lotteryArray: [] });
    return (
        <>
            <ThemeContextProvider>
                <TitleBar title={title} />
                <div className={styles.content}>
                    {!lotteryState.onLottery && <LotteryMain />}
                    {lotteryState.onLottery && <LotteryResult />}
                </div>
                <SettingBar />
            </ThemeContextProvider>
        </>
    );
}

export default App;
