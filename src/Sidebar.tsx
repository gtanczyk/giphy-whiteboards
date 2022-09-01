import {Grid, SearchBar, SearchContext, SearchContextManager} from "@giphy/react-components";
import {createCards, getViewport, Viewport} from "@whiteboards-io/plugins";
import {useContext} from "react";
import styled from "styled-components"
import Tabs, {TabsButtons} from "./Tabs";

const API_KEY = process.env["REACT_APP_GIT_SHA"] || new URLSearchParams(window.location.search).get("apiKey") || "sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh"

export default function Sidebar() {
    return <Tabs>
        {(tabType) =>
            <SearchContextManager apiKey={API_KEY} options={{type: tabType}}>
                <Components/>
            </SearchContextManager>}
    </Tabs>;
}

const Components = () => {
    const {fetchGifs, searchKey} = useContext(SearchContext);

    return (
        <Container>
            <SearchBarContainer>
                <SearchBar autoFocus={true}/>
            </SearchBarContainer>
            <TabsButtons />
            <GridContainer>
                <Grid key={searchKey} columns={2} width={window.innerWidth - 20} fetchGifs={fetchGifs}
                      onGifClick={async (gif, event) => {
                          event.preventDefault();
                          const viewport = await getCurrentViewport();
                          createCards([{
                              x: viewport.location[0],
                              y: viewport.location[1],
                              width: gif.images.preview.width / viewport.zoom,
                              height: gif.images.preview.height / viewport.zoom,
                              props: {
                                  dataURL: gif.images.downsized.url + "#image/gif",
                                  originalWidth: gif.images.downsized.width,
                                  originalHeight: gif.images.downsized.height,
                              }
                          }])
                      }}
                />
            </GridContainer>
        </Container>
    )
}

async function getCurrentViewport() {
    const {zoom, rectX, rectY, rectMaxX, rectMaxY}: Viewport = await getViewport();
    return {zoom, location: [(rectX + rectMaxX) / 2, (rectY + rectMaxY) / 2] as [number, number]} as const;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding-left: 40px;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const GridContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;