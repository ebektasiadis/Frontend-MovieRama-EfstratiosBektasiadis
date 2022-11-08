import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useMovieDB from "../../hooks/useMovieDB";
import Card from "../Card";
import Container from "../Container";
import Modal from "../Modal";
import Review from "../Review";

const Grid = styled.div`
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

const TrailerFrame = styled.iframe`
  display: block;
  border: none;
  border-radius: 5px;
  grid-area: trailer;
  height: 100%;
  width: 100%;
`;

const Reviews = styled.ul`
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

const Similar = styled.div`
  grid-area: similar;
  display: flex;
  column-gap: 10px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface IMovieDetailsModalProps {
  movieId: number;
  onHide: Function;
}

const isTrailer = (site: string, type: string) =>
  site === "YouTube" && type === "Trailer";

const MovieDetailsModal = ({ movieId, onHide }: IMovieDetailsModalProps) => {
  const [trailer, setTrailer] = useState("");

  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewHasMore, setReviewHasMore] = useState(true);

  const [similar, setSimilar] = useState<any[]>([]);
  const [similarPage, setSimilarPage] = useState(1);
  const [similarHasMore, setSimilarHasMore] = useState(true);

  const {
    useFetchMovieReviews,
    useFetchMovieSimilar,
    useFetchMovieVideos,
    useFetchMovieDetails,
  } = useMovieDB(process.env.REACT_APP_MOVIEDB_API_KEY || "");

  const { data: details } = useFetchMovieDetails(movieId);
  const { data: videos } = useFetchMovieVideos(movieId);
  const { data: dataReviews, isLoading: isLoadingReviews } =
    useFetchMovieReviews(movieId, reviewPage);
  const { data: dataSimilar, isLoading: isLoadingSimilar } =
    useFetchMovieSimilar(movieId, similarPage);

  useEffect(() => {
    if (videos) {
      setTrailer(
        videos.results.find(({ site, type }: any) => isTrailer(site, type))?.key
      );
    }
  }, [videos]);

  useEffect(() => {
    if (isLoadingReviews) return;
    if (reviewPage === dataReviews.total_pages) setReviewHasMore(false);
    setReviews((prev) => [
      ...(reviewPage > 1 ? prev : []),
      ...dataReviews.results,
    ]);
  }, [reviewPage, isLoadingReviews, dataReviews]);

  useEffect(() => {
    if (isLoadingSimilar) return;
    if (similarPage === dataSimilar.total_pages) setSimilarHasMore(false);
    setSimilar((prev: any) => [
      ...(similarPage > 1 ? prev : []),
      ...dataSimilar.results,
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
      .map((review: any) => {
        if (ids.has(review.id)) return undefined;
        ids.add(review.id);

        return (
          <Review
            key={review.id}
            avatar={review.author_details.avatar_path}
            author={review.author}
            createdAt={review.created_at}
            content={review.content}
          />
        );
      })
      .filter((review: any) => review !== undefined);
  }, [reviews]);

  const similarItems = useMemo(() => {
    const ids = new Set();
    if (!similar) return [];

    return similar
      .map((similar: any) => {
        if (ids.has(similar.id)) return undefined;
        ids.add(similar.id);

        return (
          <Card
            key={similar.id}
            id={similar.id}
            title={similar.title}
            poster={similar.poster_path}
          />
        );
      })
      .filter((similar: any) => similar !== undefined);
  }, [similar]);

  return (
    <Modal header={details ? details.title : ""} onHide={onHide}>
      <Grid>
        {trailer ? (
          <TrailerFrame
            src={`https://www.youtube-nocookie.com/embed/${trailer}?autoplay=1`}
          />
        ) : null}
        {reviews ? (
          <Container
            Layout={Reviews}
            onIntersect={onReviewIntersectHandler}
            isLoading={isLoadingReviews}
          >
            {reviewItems}
          </Container>
        ) : null}
        {similar ? (
          <Container
            Layout={Similar}
            onIntersect={onSimilarIntersectHandler}
            isLoading={isLoadingSimilar}
          >
            {similarItems}
          </Container>
        ) : null}
      </Grid>
    </Modal>
  );
};

export default MovieDetailsModal;
