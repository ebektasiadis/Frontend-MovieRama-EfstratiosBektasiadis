import styled from "styled-components";

interface IGridProps {
  noTrailer: boolean;
  noReviews: boolean;
  noSimilar: boolean;
}

export const Grid = styled.div<IGridProps>`
  display: grid;
  aspect-ratio: 16/9;
  max-width: 80vw;
  max-height: ${(props) =>
    //@ts-ignore
    props.noTrailer && props.noReviews ? "40vh" : "80vh"};
  grid-template-columns: ${(props) =>
    props.noTrailer || props.noReviews ? "1fr" : "2fr 1fr"};
  grid-template-rows: ${(props) =>
    props.noTrailer && props.noReviews ? "0% 100%" : "65% 35%"};
  grid-template-areas:
    "trailer reviews"
    "similar similar";
  gap: 10px;

  @media screen and (max-width: 1200px) {
    aspect-ratio: unset;
    max-height: 80vh;
    overflow: hidden;

    //@ts-ignore
    grid-template-rows: ${(props) =>
      `${props.noTrailer ? "0" : "4fr"} ${props.noSimilar ? "0" : "2fr"} ${
        props.noReviews ? "0" : "4fr"
      }`};
    grid-template-columns: 100%;
    grid-template-areas:
      "trailer"
      "similar"
      "reviews";
  }
`;

export const TrailerFrame = styled.iframe`
  display: block;
  border: none;
  border-radius: 5px;
  grid-area: trailer;
  height: 100%;
  width: 100%;
`;

export const Reviews = styled.div`
  border-radius: 5px;
  overflow: auto;
  overflow-x: hidden;
  grid-area: reviews;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const Similar = styled.div`
  grid-area: similar;
  display: flex;
  column-gap: 10px;
  overflow: auto;
`;
