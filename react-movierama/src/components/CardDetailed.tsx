import { forwardRef, useMemo } from "react";
import { CardDetailedStyles as Styles } from "@styles";
import { MovieContext } from "@contexts";

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
    const { setSelectedMovie } = MovieContext.useMovieContext();

    const genreListItems = useMemo(() => {
      return genres.map((name) => <li key={name}>{name}</li>);
    }, [genres]);

    return (
      <Styles.StyledCardDetailed
        data-testid="card"
        aria-label={title}
        ref={ref}
        onClick={() => setSelectedMovie(id)}
      >
        <Styles.Poster
          loading="lazy"
          alt={title}
          src={
            poster !== null
              ? `https://image.tmdb.org/t/p/w200/${poster}`
              : `/movie-poster-placeholder.png`
          }
          data-testid="poster-img"
        />
        <Styles.Details>
          <Styles.Title>{title}</Styles.Title>
          <Styles.Detail>{`Released at ${new Date(
            releaseYear
          ).toLocaleDateString()}`}</Styles.Detail>
          {genres.length ? (
            <Styles.Detail data-testid="genre-list">
              <Styles.GenreList data-testid>{genreListItems}</Styles.GenreList>
            </Styles.Detail>
          ) : null}
          {ratingCount > 0 ? (
            <Styles.Detail>{`Rating: ${rating} / 10 (${ratingCount} votes)`}</Styles.Detail>
          ) : null}
        </Styles.Details>
        <Styles.Overview aria-label={overview}>{overview}</Styles.Overview>
      </Styles.StyledCardDetailed>
    );
  }
);

export default CardDetailed;
