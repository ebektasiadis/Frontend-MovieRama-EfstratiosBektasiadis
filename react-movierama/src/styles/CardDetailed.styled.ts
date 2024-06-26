import styled from "styled-components";

export const StyledCardDetailed = styled.article`
  height: 300px;
  display: grid;
  grid-template:
    "poster details"
    "poster overview";
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, 1fr);
  background-color: var(--primary-color);
  padding: 10px;
  border-radius: 5px;
  filter: drop-shadow(0px 0px 8px #000000);
  color: white;
  cursor: pointer;

  &:hover {
    scale: 1.03;
  }

  &:active {
    scale: 0.97;
  }

  &:hover,
  &:active {
    transition: scale 200ms ease-out;
  }
`;

export const Details = styled.div`
  grid-area: details;
  display: flex;
  flex-direction: column;
`;

export const Poster = styled.img`
  grid-area: poster;
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Title = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  list-style-type: none;
`;

export const Detail = styled.span`
  color: var(--light-gray);
`;

export const Overview = styled.p`
  grid-area: overview;
  align-self: end;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
`;
