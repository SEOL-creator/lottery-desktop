import { useState } from "react";

import formatDateTime from "../utils/formatDateTime";
import cannon from "../assets/images/cannon.png";
import Ball from "./Ball";

import cannonSound from "../assets/sounds/cannonFire.wav";
import Button from "../components/Button";

import styles from "./LotteryResult.module.css";

function saveAsFile(lotteryState, index) {
    let text = "";
    text += `${lotteryState.lotteryTitle} 결과\n`;
    text += `${formatDateTime(lotteryState.lotteryDate, "YYYY년 MM월 dd일 (aaa) a/p hh시 mm분 ss초")} 시행\n`;
    text += `${lotteryState.lotterySetting}\n`;
    text += "\n[결과]\n";
    for (let i = 0; i < index + 1; i++) {
        text += `${lotteryState.lotteryArray[i]}\n`;
    }
    text += `\n결과 끝.\n`;

    window.api.send("saveAsFile", text);
}

export default function LotteryResult({ lotteryState, setLotteryState }) {
    const [index, setIndex] = useState(-1);
    const sound = new Audio(cannonSound);

    function nextBall() {
        if (lotteryState.lotteryArray.length - index - 1 <= 0) {
        } else {
            setIndex(index + 1);
        }
        sound.play();
    }

    return (
        <div className={styles.lotteryResult}>
            <div className={styles.lotteryInfoContainer}>
                <div>{lotteryState.lotteryTitle}</div>
                <div>{lotteryState.lotterySetting}</div>
                <div>{formatDateTime(lotteryState.lotteryDate, "YYYY년 MM월 dd일 (aaa) a/p hh시 mm분 ss초")}</div>
            </div>
            {lotteryState.lotteryArray.map((v, i) => {
                return <Ball type={lotteryState.lotteryTitle} currentIndex={index} key={i} index={i} value={v} />;
            })}

            <div className={styles.cannonContainer}>
                <img className={styles.cannonImage} src={cannon} alt="대포 그림" />
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.button}
                        onClick={() => {
                            nextBall();
                        }}
                    >
                        {lotteryState.lotteryArray.length - index - 1}
                    </Button>
                </div>
            </div>

            <button
                className={styles.textButton + " " + styles["textButton--left"]}
                onClick={() => {
                    setLotteryState({ onLottery: false, lotteryArray: [] });
                }}
            >
                처음으로
            </button>
            <button
                className={styles.textButton + " " + styles["textButton--right"]}
                onClick={() => {
                    saveAsFile(lotteryState, index);
                }}
            >
                파일로 저장
            </button>
        </div>
    );
}
