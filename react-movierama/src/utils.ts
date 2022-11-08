import {
  Movie,
  MovieListResponse,
  MovieReviewsResponse,
  Review,
} from "@dtypes";

export const mapResponseToMovies = (
  data: MovieListResponse,
  genreMap: Map<number, string> = new Map()
): Movie[] => {
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    releaseYear: movie.release_date,
    genres: movie.genre_ids
      .filter((genre) => genreMap.has(genre))
      .map((genre) => genreMap.get(genre) || "Unknown category"),
    rating: movie.vote_average,
    ratingCount: movie.vote_count,
    overview: movie.overview,
    poster: movie.poster_path,
  }));
};

export const mapResponseToReviews = (data: MovieReviewsResponse): Review[] => {
  return data.results.map((review) => ({
    id: review.id,
    avatar: review.author_details.avatar_path,
    author: review.author,
    createdAt: review.created_at,
    content: review.content,
  }));
};
