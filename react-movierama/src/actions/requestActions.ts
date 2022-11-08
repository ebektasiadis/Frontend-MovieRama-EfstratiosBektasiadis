import { Action, RequestActionType as ActionType } from "@dtypes";

export const requestInitAction = (): Action<ActionType> => ({
  type: ActionType.RequestInit,
});

export const requestCompleteAction = (payload: any): Action<ActionType> => ({
  type: ActionType.RequestCompleted,
  payload,
});

export const requestFailedAction = (payload: any): Action<ActionType> => ({
  type: ActionType.RequestFailed,
  payload,
});
