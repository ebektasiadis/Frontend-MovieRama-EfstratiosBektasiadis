import { forwardRef, useContext, useMemo } from "react";
import {
  StyledCardDetailed,
  Poster,
  Details,
  Title,
  GenreList,
  Detail,
  Overview,
} from "@styles/CardDetailed.styled";
import { MovieContext } from "@src/App";

interface ICardDetailedProps {
  id: number;
  poster: string | null;
  title: string;
  releaseYear: string;
  genres: string[];
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

    const genreListItems = useMemo(() => {
      return genres.map((name) => <li key={name}>{name}</li>);
    }, [genres]);

    return (
      <StyledCardDetailed
        data-testid="card"
        aria-label={title}
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
              <GenreList data-testid>{genreListItems}</GenreList>
            </Detail>
          ) : null}
          {ratingCount > 0 ? (
            <Detail>{`Rating: ${rating} / 10 (${ratingCount} votes)`}</Detail>
          ) : null}
        </Details>
        <Overview aria-label={overview}>{overview}</Overview>
      </StyledCardDetailed>
    );
  }
);

export default CardDetailed;
