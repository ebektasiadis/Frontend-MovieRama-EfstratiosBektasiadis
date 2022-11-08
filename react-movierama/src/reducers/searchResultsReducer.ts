import {
  Action,
  SearchResultsState,
  SearchResultsActionType as ActionType,
} from "@src/types";

export const searchResultsInitialState: SearchResultsState = {
  page: 1,
  searchQuery: "",
};

export const searchResultsReducer = (
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
