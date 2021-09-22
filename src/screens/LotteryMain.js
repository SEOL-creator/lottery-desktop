import { Tab, TabContent, TabHeader, TabHeaderItem } from "../components/Tab";

export default function LotteryMain() {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ width: "100%" }}>
                <Tab>
                    <TabHeader>
                        <TabHeaderItem index={0}>숫자 뽑기</TabHeaderItem>
                        <TabHeaderItem index={1}>카페글 뽑기</TabHeaderItem>
                    </TabHeader>
                    <TabContent index={0}>
                        <div>숫자 뽑기</div>
                    </TabContent>
                    <TabContent index={1}>
                        <div>카페글 뽑기</div>
                    </TabContent>
                </Tab>
            </div>
        </div>
    );
}
