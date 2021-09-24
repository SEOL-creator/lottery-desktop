import { useState } from "react";

import styles from "./App.module.css";

import TitleBar from "../components/TitleBar";
import LotteryMain from "./LotteryMain";
import LotteryResult from "./LotteryResult";
import SettingBar from "../components/SettingBar";

import { ThemeContextProvider } from "../contexts/themeContext";

function App() {
    const [title, setTitle] = useState("대포 뽑기");
    const [lotteryState, setLotteryState] = useState({ onLottery: false, lotteryArray: [], lotteryTitle: "", lotterySetting: "", lotteryDate: "" });
    return (
        <>
            <ThemeContextProvider>
                <TitleBar title={title} />
                <div className={styles.content}>
                    {!lotteryState.onLottery && <LotteryMain lotteryState={lotteryState} setLotteryState={setLotteryState} />}
                    {lotteryState.onLottery && <LotteryResult lotteryState={lotteryState} setLotteryState={setLotteryState} />}
                </div>
                <SettingBar />
            </ThemeContextProvider>
        </>
    );
}

export default App;
