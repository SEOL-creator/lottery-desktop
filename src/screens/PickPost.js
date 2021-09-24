import Button from "../components/Button";
import useInput from "../hooks/useInput";
import generateAscArray from "../utils/generateAscArray";
import { fysShuffle } from "../utils/shuffle";
import styles from "./PickPost.module.css";

export default function PickPost({ setLotteryState }) {
    const pageNum = useInput(5);
    const lastPagePosts = useInput(15);

    function runLottery(page, lastPost) {
        if (page < 1 || lastPost < 1) return;

        let resultArray = [];

        function pushToResultArray(page, num) {
            resultArray.push(`${page}페이지 ${num}번`);
        }

        for (let i = 0; i < page; i++) {
            if (i === page - 1) {
                fysShuffle(generateAscArray(1, lastPost)).forEach((v) => {
                    pushToResultArray(i + 1, v);
                });
            } else {
                fysShuffle(generateAscArray(1, 15)).forEach((v) => {
                    pushToResultArray(i + 1, v);
                });
            }
        }

        resultArray = fysShuffle(resultArray);

        setLotteryState({
            onLottery: true,
            lotteryArray: resultArray,
            lotteryTitle: "게시글 뽑기",
            lotterySetting: `페이지당 15게시글, 페이지 ${page}개, 마지막페이지 게시글 ${lastPost}개`,
            lotteryDate: new Date(),
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.infoText}>한 페이지당 게시글 15개 기준</div>
            <div className={styles.form}>
                <div className={styles.question} style={{ marginTop: "70px" }}>
                    페이지 수
                </div>
                <input style={{ marginBottom: "30px" }} type="number" {...pageNum} />
                <div className={styles.question}>마지막 페이지 게시글 수</div>
                <input style={{ marginBottom: "80px" }} type="number" {...lastPagePosts} />
                <Button
                    className={styles.button}
                    onClick={() => {
                        runLottery(pageNum.value, lastPagePosts.value);
                    }}
                >
                    추첨
                </Button>
            </div>
        </div>
    );
}
