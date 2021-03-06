import { useState, createContext, useContext } from "react";

import "./Tab.css";

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
            <div className="tab">{props.children}</div>
        </TabContext.Provider>
    );
}

export const TabHeader = (props) => {
    const { tabIndex } = useTabContext();
    const tabBarWidth = Math.round(10000 / props.children.length) / 100;
    return (
        <>
            <div className="tab__header">{props.children}</div>
            <div className="tab__bar">
                <div style={{ width: tabBarWidth + "%", marginLeft: tabIndex * tabBarWidth + "%" }}></div>
            </div>
        </>
    );
};

export const TabHeaderItem = (props) => {
    const { setTabIndex } = useTabContext();

    let onClickHandler = () => setTabIndex(props.index);
    if (props.onClickOverride) {
        onClickHandler = () => {
            props.onClickOverride();
            setTabIndex(props.index);
        };
    }

    let classNames = [];
    classNames.push("header__item");
    classNames.push(props.className);
    classNames = classNames.join(" ");
    return (
        <div className={classNames} onClick={onClickHandler}>
            {props.children}
        </div>
    );
};

export function TabContent(props) {
    const { tabIndex } = useTabContext();
    if (props.index === tabIndex || (Array.isArray(props.index) && props.index.includes(tabIndex))) {
        return props.children;
    } else {
        return null;
    }
}
