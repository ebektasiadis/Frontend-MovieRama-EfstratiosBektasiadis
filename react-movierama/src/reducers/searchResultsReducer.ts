import {
  Action,
  SearchResultsState,
  SearchResultsActionType as ActionType,
} from "@src/types";

export const initialState: SearchResultsState = {
  page: 1,
  searchQuery: "",
};

export const reducer = (
  state: SearchResultsState,
  action: Action<ActionType>
): SearchResultsState => {
  switch (action.type) {
    case ActionType.UpdateSearchQuery:
      return { ...state, page: 1, searchQuery: action.payload };
    case ActionType.SetPage:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
