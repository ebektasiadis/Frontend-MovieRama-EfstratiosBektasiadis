import { forwardRef, useContext } from "react";
import styled from "styled-components";
import { MovieContext } from "../App";

const StyledCardDetailed = styled.article`
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

const Details = styled.div`
  grid-area: details;
  display: flex;
  flex-direction: column;
`;

const Poster = styled.img`
  grid-area: poster;
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

const Title = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GenreList = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  list-style-type: none;
`;

const Detail = styled.span`
  color: var(--light-gray);
`;

const Overview = styled.p`
  grid-area: overview;
  align-self: end;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
`;

interface ICardDetailedProps {
  id: number;
  poster: string | null;
  title: string;
  releaseYear: string;
  genres: number[];
  rating: number;
  ratingCount: number;
  overview: string;
}

const CardDetailed = forwardRef<any, ICardDetailedProps>(
  (
    {
      id,
      poster,
      title,
      releaseYear,
      genres,
      rating,
      ratingCount,
      overview,
    }: ICardDetailedProps,
    ref
  ) => {
    const { setSelectedMovie } = useContext(MovieContext);
    return (
      <StyledCardDetailed
        data-testid="card"
        ref={ref}
        onClick={() => setSelectedMovie(id)}
      >
        <Poster
          loading="lazy"
          alt={title}
          src={
            poster !== null
              ? `https://image.tmdb.org/t/p/w200/${poster}`
              : `/movie-poster-placeholder.png`
          }
          data-testid="poster-img"
        />
        <Details>
          <Title>{title}</Title>
          <Detail>{`Released at ${releaseYear}`}</Detail>
          {genres.length ? (
            <Detail data-testid="genre-list">
              <GenreList data-testid>{genres.join(" ")}</GenreList>
            </Detail>
          ) : null}
          <Detail>{`Rating: ${rating} / 10 (${ratingCount} votes)`}</Detail>
        </Details>
        <Overview>{overview}</Overview>
      </StyledCardDetailed>
    );
  }
);

export default CardDetailed;
