import { ActionTypes } from "../action.types";
import { Dispatch } from "react";
import { Action } from "../actions";
import bundle from "../../bundler/bundle";

export const createBundle = (cellId: string, inputCode: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.BUNDLE_START, payload: { cellId } });

    const result = await bundle(inputCode);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
