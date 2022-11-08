import { createContext, ReactNode, useContext, useState } from "react";

import { MovieContextState } from "@dtypes";

const initialContext: MovieContextState = {
  selectedMovie: 0,
  setSelectedMovie: (id: number) => undefined,
};

const MovieContext = createContext<MovieContextState>(initialContext);

const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(
      `useMovieContext can't be used outside of the MovieContextProvider`
    );
  }

  return context;
};

interface IMovieStateProviderProps {
  children: ReactNode;
}

const MovieContextProvider = ({ children }: IMovieStateProviderProps) => {
  const [selectedMovie, setSelectedMovie] = useState(0);

  const value: MovieContextState = {
    selectedMovie,
    setSelectedMovie,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export { MovieContextProvider, useMovieContext };
