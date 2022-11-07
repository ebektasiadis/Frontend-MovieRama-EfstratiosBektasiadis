import axios, { AxiosInstance } from "axios";
import { useEffect, useMemo, useReducer } from "react";

type State = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: any;
  error?: any;
};

enum ActionType {
  RequestInit = "REQUEST_INIT",
  RequestCompleted = "REQUEST_COMPLETED",
  RequestFailed = "REQUEST_FAILED",
}

type Action = {
  type: ActionType;
  payload?: any;
};

const initialState: State = {
  isLoading: true,
  isError: false,
  isSuccess: false,
};

const reducer = (state: State, action: Action): State => {
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

const requestInitAction = (): Action => ({
  type: ActionType.RequestInit,
});

const requestCompleteAction = (payload: any): Action => ({
  type: ActionType.RequestCompleted,
  payload,
});

const requestFailedAction = (payload: any): Action => ({
  type: ActionType.RequestFailed,
  payload,
});

const useFetchMovieDetails = ({ id, instance }: any) => {
  return useRequest(instance, `/movie/${id}`, id);
};

const useFetchMovieVideos = ({ id, instance }: any) => {
  return useRequest(instance, `/movie/${id}/videos`, id);
};

const useFetchMovieReviews = ({ id, instance }: any) => {
  return useRequest(instance, `/movie/${id}/reviews`, id);
};

const useFetchMovieSimilar = ({ id, instance }: any) => {
  return useRequest(instance, `/movie/${id}/similar`, id);
};

const useFetchNowPlaying = ({ page, instance, canExec }: any) => {
  const options = useMemo(() => ({ params: { page } }), [page]);

  return useRequest(instance, "/movie/now_playing", canExec, options);
};

const useFetchSearchResults = ({ page, query, instance, canExec }: any) => {
  const options = useMemo(() => ({ params: { page, query } }), [page, query]);

  return useRequest(instance, "/search/movie", canExec, options);
};

const useFetchGenres = ({ instance }: any) => {
  return useRequest(instance, "/genre/movie/list", true);
};

const useRequest = (
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
        const response = await instance.get(url, {
          ...options,
        });
        dispatch(requestCompleteAction(response.data));
      } catch (error) {
        dispatch(requestFailedAction(error));
      }
    };
    if (exec) main();
  }, [instance, url, options, exec]);

  return { ...state };
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
    useFetchMovieReviews: (id: number) =>
      useFetchMovieReviews({ id, instance }),
    useFetchMovieSimilar: (id: number) =>
      useFetchMovieSimilar({ id, instance }),
  };
};

export default useMovieDB;
