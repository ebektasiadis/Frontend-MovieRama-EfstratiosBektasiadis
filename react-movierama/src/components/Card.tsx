import { forwardRef, useContext } from "react";
import styled from "styled-components";
import { MovieContext } from "../App";

const StyledCard = styled.article`
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

const Poster = styled.img`
  grid-area: poster;
  object-fit: cover;
  width: 200px;
  border-radius: 5px;
`;

interface ICardProps {
  id: number;
  title: string;
  poster: string | null;
}

const Card = forwardRef<any, ICardProps>(
  ({ id, title, poster }: ICardProps, ref) => {
    const { setSelectedMovie } = useContext(MovieContext);
    return (
      <StyledCard ref={ref} onClick={() => setSelectedMovie(id)}>
        <Poster
          loading="lazy"
          alt={title}
          src={
            poster !== null
              ? `https://image.tmdb.org/t/p/w200/${poster}`
              : `/movie-poster-placeholder.png`
          }
        />
      </StyledCard>
    );
  }
);

export default Card;
