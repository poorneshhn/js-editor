import { showFunctionString, showNoop } from "../utils/utils";
import { useTypedSelector } from "./use-typed-selector";

const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedData = order.map((id) => data[id]);
    let show: string = showFunctionString;
    let showFuncNoop = showNoop;

    let cumulativeCode = [];
    for (let code of orderedData) {
      if (code.id === cellId) {
        cumulativeCode.push(show);
      } else {
        cumulativeCode.push(showFuncNoop);
      }
      if (code.type === "code") {
        cumulativeCode.push(code.content);
      }

      if (code.id === cellId) break;
    }
    return cumulativeCode;
  });
};

export default useCumulativeCode;
