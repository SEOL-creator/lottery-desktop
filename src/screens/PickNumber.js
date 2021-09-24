import Button from "../components/Button";

import useInput from "../hooks/useInput";
import generateAscArray from "../utils/generateAscArray";
import { fysShuffle } from "../utils/shuffle";

import styles from "./PickNumber.module.css";

export default function PickNumber({ setLotteryState }) {
    const lastNum = useInput(50);

    function runLottery(value) {
        // Validate
        if (value < 1) return;

        // Make array, shuffle array
        const resultArray = fysShuffle(generateAscArray(1, value));
        setLotteryState({ onLottery: true, lotteryArray: resultArray, lotteryTitle: "숫자 뽑기", lotterySetting: `마지막 번호 ${value}번`, lotteryDate: new Date() });
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.question}>마지막 번호가 몇 번인가요?</div>
                <input className={styles.input} type="number" {...lastNum} />
                <Button
                    className={styles.button}
                    onClick={() => {
                        runLottery(lastNum.value);
                    }}
                >
                    추첨
                </Button>
            </div>
        </div>
    );
}
