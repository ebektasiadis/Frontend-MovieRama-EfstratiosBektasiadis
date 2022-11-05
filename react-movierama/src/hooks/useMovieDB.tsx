import axios, { AxiosInstance } from "axios";
import { useEffect, useMemo, useReducer } from "react";

type State = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: any[];
  error?: any[];
  page: number;
  totalPages: number;
  hasMore: boolean;
};

enum ActionType {
  RequestInit = "REQUEST_INIT",
  RequestCompleted = "REQUEST_COMPLETED",
  RequestFailed = "REQUEST_FAILED",
  IncreasePage = "INCREASE_PAGE",
  ResetPage = "RESET_PAGE",
}

type Action = {
  type: ActionType;
  payload?: any;
};

const initialState: State = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  page: 1,
  totalPages: 1,
  hasMore: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.RequestInit:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: undefined,
        error: undefined,
      };
    case ActionType.RequestCompleted:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload.results,
        hasMore: action.payload?.total_pages > state.page,
      };
    case ActionType.RequestFailed:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    case ActionType.IncreasePage:
      return {
        ...state,
        page: state.page + 1,
      };
    case ActionType.ResetPage:
      return {
        ...state,
        page: 1,
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

const requestIncreasePageAction = (): Action => ({
  type: ActionType.IncreasePage,
});

const requestResetPageAction = (): Action => ({
  type: ActionType.ResetPage,
});

const useFetchNowPlaying = (instance: AxiosInstance) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      dispatch(requestInitAction());
      try {
        const response = await instance.get("/movie/now_playing", {
          params: {
            page: state.page,
          },
        });
        dispatch(requestCompleteAction(response.data));
      } catch (error) {
        dispatch(requestFailedAction(error));
      }
    })();
  }, [instance, state.page]);

  const fetchNext = () => {
    if (state.hasMore) {
      dispatch(requestIncreasePageAction());
    }
  };

  return () => {
    return { ...state, fetchNext };
  };
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
    useFetchNowPlaying: useFetchNowPlaying(instance),
  };
};

export default useMovieDB;
