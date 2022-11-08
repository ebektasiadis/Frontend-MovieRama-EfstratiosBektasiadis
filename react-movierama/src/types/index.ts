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
  avatar: string;
  author: string;
  createdAt: string;
  content: string;
}
