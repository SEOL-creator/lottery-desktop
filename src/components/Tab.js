/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState, createContext, useContext, memo } from "react";

const TabWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const TabHeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const TabHeaderItemWrapper = styled.button`
    background-color: var(--background-higher);
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-normal);
    width: 100%;
    height: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TabBar = styled.div`
    height: 0.2rem;
    background-color: orange;
    transition: margin-left 0.2s ease-in-out;
`;

const TabContext = createContext();
const useTabContext = () => useContext(TabContext);

export function Tab(props) {
    const [tabIndex, setTabIndex] = useState(0);

    const context = {
        tabIndex,
        setTabIndex,
    };

    return (
        <TabContext.Provider value={context}>
            <TabWrapper>{props.children}</TabWrapper>
        </TabContext.Provider>
    );
}

export const TabHeader = memo((props) => {
    const { tabIndex } = useTabContext();
    const tabBarWidth = Math.round(10000 / props.children.length) / 100;
    return (
        <>
            <TabHeaderWrapper>{props.children}</TabHeaderWrapper>
            <div style={{ backgroundColor: "var(--background-higher)", width: "100%" }}>
                <TabBar style={{ width: tabBarWidth + "%", marginLeft: tabIndex * tabBarWidth + "%" }} />
            </div>
        </>
    );
});

export const TabHeaderItem = memo((props) => {
    const { setTabIndex } = useTabContext();

    let onClickHandler = () => setTabIndex(props.index);
    if (props.onClickOverride) {
        onClickHandler = () => {
            props.onClickOverride();
            setTabIndex(props.index);
        };
    }
    return (
        <TabHeaderItemWrapper onClick={onClickHandler} className={props.className}>
            {props.children}
        </TabHeaderItemWrapper>
    );
});

export function TabContent(props) {
    const { tabIndex } = useTabContext();
    if (props.index === tabIndex || (Array.isArray(props.index) && props.index.includes(tabIndex))) {
        return props.children;
    } else {
        return null;
    }
}
