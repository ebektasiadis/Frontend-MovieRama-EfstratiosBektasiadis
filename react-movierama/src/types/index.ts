export interface Movie {
  id: number;
  poster?: string;
  title: string;
  releaseYear: string;
  genres: string[];
  rating: number;
  ratingCount: number;
  overview: string;
}

export interface Review {
  id: string;
  avatar: string;
  author: string;
  createdAt: string;
  content: string;
}

/**
 * States
 */

export type RequestState<T> = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: T;
  error?: T;
};

export type SearchResultsState = {
  page: number;
  searchQuery: string;
};

/**
 * Contexts
 */

export interface MovieContextState {
  selectedMovie: number;
  setSelectedMovie: (id: number) => void;
}

/**
 * Action Types
 */

export type Action<T> = {
  type: T;
  payload?: any;
};

export enum RequestActionType {
  RequestInit = "REQUEST_INIT",
  RequestCompleted = "REQUEST_COMPLETED",
  RequestFailed = "REQUEST_FAILED",
}

export enum SearchResultsActionType {
  UpdateSearchQuery = "UPDATE_SEARCH_QUERY",
  SetPage = "SET_PAGE",
}

/**
 * API Responses
 */

enum MovieStatus {
  "Rumored",
  "Planned",
  "In Production",
  "Post Production",
  "Released",
  "Canceled",
}

interface MovieListItem {
  poster_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating?: number;
}

interface ReviewItem {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface MultiPageResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieGenresResponse {
  genres: Genre[];
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

export interface MovieSimilarResponse extends MultiPageResponse {
  results: MovieListItem[];
}

export interface MovieReviewsResponse extends MultiPageResponse {
  results: ReviewItem[];
}

export interface MovieListResponse extends MultiPageResponse {
  results: MovieListItem[];
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: { [key: string]: any };
  budget: number;
  genres: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: SpokenLanguage[];
  status: MovieStatus;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
