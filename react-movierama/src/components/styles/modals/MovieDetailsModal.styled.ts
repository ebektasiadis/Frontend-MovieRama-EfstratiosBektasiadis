import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  aspect-ratio: 16/9;
  max-width: 80vw;
  max-height: 80vh;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 65% 35%;
  grid-template-areas:
    "trailer reviews"
    "similar similar";
  gap: 10px;

  @media screen and (max-width: 1200px) {
    aspect-ratio: unset;
    max-height: 80vh;
    overflow: hidden;
    grid-template-rows: 40% 20% 40%;
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
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const Similar = styled.div`
  grid-area: similar;
  display: flex;
  column-gap: 10px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
