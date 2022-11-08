import {
  Action,
  MovieDetailsResponse,
  MovieGenresResponse,
  MovieListResponse,
  MovieReviewsResponse,
  MovieSimilarResponse,
  MovieVideosResponse,
  RequestActionType as ActionType,
  RequestActionType,
  RequestState,
} from "@dtypes";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useMemo, useReducer } from "react";

const initialState: RequestState<undefined> = {
  isLoading: true,
  isError: false,
  isSuccess: false,
};

const reducer = <T>(
  state: RequestState<T>,
  action: Action<RequestActionType>
): RequestState<T> => {
  switch (action.type) {
    case ActionType.RequestInit:
      return {
        ...initialState,
      };
    case ActionType.RequestCompleted:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload,
      };
    case ActionType.RequestFailed:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const requestInitAction = (): Action<RequestActionType> => ({
  type: ActionType.RequestInit,
});

const requestCompleteAction = (payload: any): Action<RequestActionType> => ({
  type: ActionType.RequestCompleted,
  payload,
});

const requestFailedAction = (payload: any): Action<RequestActionType> => ({
  type: ActionType.RequestFailed,
  payload,
});

const useFetchMovieDetails = ({ id, instance }: any) => {
  return useRequest<MovieDetailsResponse>(instance, `/movie/${id}`, id);
};

const useFetchMovieVideos = ({ id, instance }: any) => {
  return useRequest<MovieVideosResponse>(instance, `/movie/${id}/videos`, id);
};

const useFetchMovieReviews = ({ id, instance, page }: any) => {
  const options = useMemo(() => ({ params: { page } }), [page]);
  return useRequest<MovieReviewsResponse>(
    instance,
    `/movie/${id}/reviews`,
    id,
    options
  );
};

const useFetchMovieSimilar = ({ id, instance, page }: any) => {
  const options = useMemo(() => ({ params: { page } }), [page]);
  return useRequest<MovieSimilarResponse>(
    instance,
    `/movie/${id}/similar`,
    id,
    options
  );
};

const useFetchNowPlaying = ({ page, instance, canExec }: any) => {
  const options = useMemo(() => ({ params: { page } }), [page]);

  return useRequest<MovieListResponse>(
    instance,
    "/movie/now_playing",
    canExec,
    options
  );
};

const useFetchSearchResults = ({ page, query, instance, canExec }: any) => {
  const options = useMemo(() => ({ params: { page, query } }), [page, query]);

  return useRequest<MovieListResponse>(
    instance,
    "/search/movie",
    canExec,
    options
  );
};

const useFetchGenres = ({ instance }: any) => {
  return useRequest<MovieGenresResponse>(instance, "/genre/movie/list", true);
};

const useRequest = <T>(
  instance: AxiosInstance,
  url: string,
  exec: boolean,
  options?: any
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const main = async () => {
      try {
        dispatch(requestInitAction());
        const response: AxiosResponse<T> = await instance.get(url, {
          ...options,
        });
        dispatch(requestCompleteAction(response.data));
      } catch (error) {
        dispatch(requestFailedAction(error));
      }
    };
    if (exec) main();
  }, [instance, url, options, exec]);

  return { ...state, data: state.data as T };
};

const useMovieDB = (apiKey: string, language = "en-US") => {
  const instance: AxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: "https://api.themoviedb.org/3/",
        params: {
          api_key: apiKey,
          language,
        },
      }),
    [apiKey, language]
  );

  return {
    useFetchNowPlaying: (page: number, canExec: boolean) =>
      useFetchNowPlaying({ page, instance, canExec }),
    useFetchGenres: () => useFetchGenres({ instance }),
    useFetchSearchResults: (page: number, query: string, canExec: boolean) =>
      useFetchSearchResults({ page, query, instance, canExec }),

    useFetchMovieDetails: (id: number) =>
      useFetchMovieDetails({ id, instance }),
    useFetchMovieVideos: (id: number) => useFetchMovieVideos({ id, instance }),
    useFetchMovieReviews: (id: number, page: number) =>
      useFetchMovieReviews({ id, instance, page }),
    useFetchMovieSimilar: (id: number, page: number) =>
      useFetchMovieSimilar({ id, instance, page }),
  };
};

export default useMovieDB;
