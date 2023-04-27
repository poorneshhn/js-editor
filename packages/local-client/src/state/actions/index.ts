import { ActionTypes } from "../action.types";
import { Cell, CellTypes } from "../cell";
export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: {
    id: string;
  };
}
export interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export type Direction = "up" | "down";

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface FetchCellAction {
  type: ActionTypes.FETCH_CELL;
}
export interface FetchCellCompleteAction {
  type: ActionTypes.FETCH_CELL_COMPLETE;
  payload: Cell[];
}
export interface FetchCellErrorAction {
  type: ActionTypes.FETCH_CELL_ERROR;
  payload: string;
}

export interface SaveCellErrorAction {
  type: ActionTypes.SAVE_CELL_ERROR;
  payload: string;
}

export interface SetShareCodeAction {
  type: ActionTypes.SET_SHARE_CODE;
  payload: boolean;
}

export type Action =
  | MoveCellAction
  | UpdateCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellAction
  | FetchCellCompleteAction
  | FetchCellErrorAction
  | SaveCellErrorAction
  | SetShareCodeAction;
