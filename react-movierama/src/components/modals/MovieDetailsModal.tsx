import { useEffect, useMemo, useState } from "react";
import { Movie, Review } from "@dtypes";
import { useMovieDB } from "@hooks";
import { MovieDetailsModalStyles as Styles } from "@styles";
import { Card, Modal, Container, Review as ReviewComponent } from "@components";

interface IMovieDetailsModalProps {
  movieId: number;
  onHide: Function;
}

const isTrailer = (site: string, type: string) =>
  site === "YouTube" && type === "Trailer";

const MovieDetailsModal = ({ movieId, onHide }: IMovieDetailsModalProps) => {
  const [trailer, setTrailer] = useState("");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewHasMore, setReviewHasMore] = useState(true);

  const [similar, setSimilar] = useState<Movie[]>([]);
  const [similarPage, setSimilarPage] = useState(1);
  const [similarHasMore, setSimilarHasMore] = useState(true);

  const {
    useFetchMovieReviews,
    useFetchMovieSimilar,
    useFetchMovieVideos,
    useFetchMovieDetails,
  } = useMovieDB(process.env.REACT_APP_MOVIEDB_API_KEY || "");

  const { data: details } = useFetchMovieDetails(movieId);
  const { data: videos, isLoading: isLoadingVideos } =
    useFetchMovieVideos(movieId);
  const { data: dataReviews, isLoading: isLoadingReviews } =
    useFetchMovieReviews(movieId, reviewPage);
  const { data: dataSimilar, isLoading: isLoadingSimilar } =
    useFetchMovieSimilar(movieId, similarPage);

  useEffect(() => {
    if (videos) {
      setTrailer(
        videos.results.find((video) => isTrailer(video.site, video.type))
          ?.key || ""
      );
    }
  }, [videos]);

  useEffect(() => {
    if (isLoadingReviews) return;
    if (reviewPage === dataReviews.total_pages) setReviewHasMore(false);

    const newReviews: Review[] = dataReviews.results.map((review) => ({
      id: review.id,
      avatar: review.author_details.avatar_path,
      author: review.author,
      createdAt: review.created_at,
      content: review.content,
    }));

    setReviews((prev) => [...(reviewPage > 1 ? prev : []), ...newReviews]);
  }, [reviewPage, isLoadingReviews, dataReviews]);

  useEffect(() => {
    if (isLoadingSimilar) return;
    if (similarPage === dataSimilar.total_pages) setSimilarHasMore(false);

    const newSimilar: Movie[] = dataSimilar.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseYear: movie.release_date,
      genres: [] as string[],
      rating: movie.vote_average,
      ratingCount: movie.vote_count,
      overview: movie.overview,
      poster: movie.poster_path,
    }));

    setSimilar((prev: any) => [
      ...(similarPage > 1 ? prev : []),
      ...newSimilar,
    ]);
  }, [similarPage, isLoadingSimilar, dataSimilar]);

  const onReviewIntersectHandler = () => {
    if (reviewHasMore) setReviewPage((prev) => prev + 1);
  };

  const onSimilarIntersectHandler = () => {
    if (similarHasMore) setSimilarPage((prev) => prev + 1);
  };

  const reviewItems = useMemo(() => {
    const ids = new Set();
    if (!reviews) return [];

    return reviews
      .map((review) => {
        if (ids.has(review.id)) return undefined;
        ids.add(review.id);

        return <ReviewComponent key={review.id} {...review} />;
      })
      .filter((review?) => review);
  }, [reviews]);

  const similarItems = useMemo(() => {
    const ids = new Set();
    if (!similar) return [];

    return similar
      .map((similar) => {
        if (ids.has(similar.id)) return undefined;
        ids.add(similar.id);

        return <Card key={similar.id} {...similar} />;
      })
      .filter((similar?) => similar !== undefined);
  }, [similar]);

  const hasTrailer = trailer.length > 0 && !isLoadingVideos;
  const hasSimilar = similar.length > 0 && !isLoadingSimilar;
  const hasReviews = reviews.length > 0 && !isLoadingReviews;

  return (
    <Modal
      header={details ? details.title : ""}
      onHide={onHide}
      aria-label={"Movie Details Modal"}
    >
      <Styles.Grid
        noTrailer={!hasTrailer}
        noReviews={!hasReviews}
        noSimilar={!hasSimilar}
      >
        {trailer ? (
          <Styles.TrailerFrame
            src={`https://www.youtube-nocookie.com/embed/${trailer}?autoplay=1`}
            aria-label={"Movie trailer"}
          />
        ) : null}
        {reviews ? (
          <Container
            layout={Styles.Reviews}
            onIntersect={onReviewIntersectHandler}
            isLoading={isLoadingReviews}
            aria-label={"Reviews"}
          >
            {reviewItems}
          </Container>
        ) : null}
        {similar ? (
          <Container
            layout={Styles.Similar}
            onIntersect={onSimilarIntersectHandler}
            isLoading={isLoadingSimilar}
            aria-label={"Similar movies"}
          >
            {similarItems}
          </Container>
        ) : null}
      </Styles.Grid>
    </Modal>
  );
};

export default MovieDetailsModal;
