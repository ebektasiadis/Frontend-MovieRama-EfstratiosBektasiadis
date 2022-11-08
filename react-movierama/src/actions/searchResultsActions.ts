import { Action, SearchResultsActionType as ActionType } from "@dtypes";

export const requestUpdateSearchQuery = (
  searchQuery: string
): Action<ActionType> => ({
  type: ActionType.UpdateSearchQuery,
  payload: searchQuery,
});

export const requestSetPage = (page: number): Action<ActionType> => ({
  type: ActionType.SetPage,
  payload: page,
});
