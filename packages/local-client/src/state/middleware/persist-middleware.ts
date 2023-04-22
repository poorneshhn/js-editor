import { Dispatch } from "redux";
import { saveCells } from "../action.creators";
import { ActionTypes } from "../action.types";
import { Action } from "../actions";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: NodeJS.Timeout;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (
        [
          ActionTypes.UPDATE_CELL,
          ActionTypes.MOVE_CELL,
          ActionTypes.UPDATE_CELL,
          ActionTypes.DELETE_CELL,
          ActionTypes.INSERT_CELL_AFTER,
        ].includes(action.type)
      ) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 1000);
      }
    };
  };
};
