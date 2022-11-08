import styled from "styled-components";

export const StyledCard = styled.article`
  background-color: var(--primary-color);
  padding: 5px;
  margin: 10px 0;
  border-radius: 5px;
  filter: drop-shadow(0px 0px 4px #000000);
  color: white;
  display: flex;
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

export const Poster = styled.img`
  grid-area: poster;
  object-fit: cover;
  width: 200px;
  border-radius: 5px;
`;
