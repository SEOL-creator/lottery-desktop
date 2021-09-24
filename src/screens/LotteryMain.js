import "./LotteryMain.css";

import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";
import PickNumber from "./PickNumber";
import PickPost from "./PickPost";

export default function LotteryMain({ setLotteryState }) {
    return (
        <div className="lottery-main">
            <Tab>
                <TabHeader>
                    <TabHeaderItem index={0}>숫자 뽑기</TabHeaderItem>
                    <TabHeaderItem index={1}>카페글 뽑기</TabHeaderItem>
                </TabHeader>
                <TabContent index={0}>
                    <PickNumber setLotteryState={setLotteryState} />
                </TabContent>
                <TabContent index={1}>
                    <PickPost setLotteryState={setLotteryState} />
                </TabContent>
            </Tab>
        </div>
    );
}
