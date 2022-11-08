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
import { MovieContext } from "../App";

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
    const { genres: genreLabels, setSelectedMovie } = useContext(MovieContext);

    const genreListItems = useMemo(() => {
      if (!genreLabels.length) return [];
      let labels = new Map();
      genreLabels.forEach(({ id, name }: any) => labels.set(id, name));
      return genres.map((id) => <li key={id}>{labels.get(id)}</li>);
    }, [genreLabels, genres]);

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
              <GenreList data-testid>{genreListItems}</GenreList>
            </Detail>
          ) : null}
          {ratingCount > 0 ? (
            <Detail>{`Rating: ${rating} / 10 (${ratingCount} votes)`}</Detail>
          ) : null}
        </Details>
        <Overview>{overview}</Overview>
      </StyledCardDetailed>
    );
  }
);

export default CardDetailed;
