import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action.types";
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: {
      id,
    },
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELL });
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");

      dispatch({
        type: ActionTypes.FETCH_CELL_COMPLETE,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error)
        dispatch({
          type: ActionTypes.FETCH_CELL_ERROR,
          payload: error.message,
        });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { data, order } = getState().cells;

    const cells = Object.values(data);

    try {
      axios.post("/cells", { cells });
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ActionTypes.SAVE_CELL_ERROR, payload: error.message });
    }
  };
};
