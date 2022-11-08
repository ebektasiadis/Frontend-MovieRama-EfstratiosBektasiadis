import { RequestState, Action, RequestActionType as ActionType } from "@dtypes";

export const requestInitialState: RequestState<undefined> = {
  isLoading: true,
  isError: false,
  isSuccess: false,
};

export const requestReducer = <T>(
  state: RequestState<T>,
  action: Action<ActionType>
): RequestState<T> => {
  switch (action.type) {
    case ActionType.RequestInit:
      return {
        ...requestInitialState,
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
