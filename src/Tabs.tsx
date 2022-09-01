import React, {useContext, useState} from "react";
import styled from "styled-components";

type TabType = "gifs" | "stickers";

const TabsContext = React.createContext<[TabType, (tabType: TabType) => void]>(["gifs", (tabType: TabType) => {
}]);

export default function Tabs(props: { children: (tabType: TabType) => React.ReactNode }) {
    const [tabType, setTabType] = useState<TabType>("gifs");

    return <TabsContext.Provider value={[tabType, setTabType]}>
        {props.children(tabType)}
    </TabsContext.Provider>
}

export function TabsButtons() {
    const [tabType, setTabType] = useContext(TabsContext);

    return <Container>
        <button onClick={() => setTabType("gifs")} data-selected={tabType === "gifs"}>Gifs</button>
        <button onClick={() => setTabType("stickers")} data-selected={tabType === "stickers"}>Stickers</button>
    </Container>
}

const Container = styled.div`
  display: inline-flex;

  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 15px;

  button {
    margin-right: 10px;
    background: none;
    border: none;
    cursor: pointer;

    &[data-selected="true"] {
      font-weight: bold;
    }
  }
`;