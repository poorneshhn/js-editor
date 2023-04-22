import { useEffect, useRef } from "react";
import CodeEditor from "../monaco-editor/CodeEditor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "../preview/Preview";
import ResizableComponent from "../resize-component/ResizableComponent";
import "./code-cell.css";
import { Cell } from "../../state";
import useActions from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import useCumulativeCode from "../../hooks/use-cumulative-code";

interface codeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<codeCellProps> = ({ cell }) => {
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const debounceInputCodeFieldTimer = useRef<any>(null);
  const { updateCell, createBundle } = useActions();
  const cumulativeCode = useCumulativeCode(cell.id);
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }
    clearTimeout(debounceInputCodeFieldTimer.current);
    debounceInputCodeFieldTimer.current = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 1000);

    return () => clearTimeout(debounceInputCodeFieldTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join("\n"), cell.id, createBundle]);

  return (
    <ResizableComponent direction="vertical">
      <div className="code-cell">
        <ResizableComponent direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </ResizableComponent>
        <div className="progress-preview-wrapper">
          {!bundle || bundle?.loading ? (
            <div className="progress-cover">
              <progress max="100" className="progress is-primary is-small">
                loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.error} />
          )}
        </div>
      </div>
    </ResizableComponent>
  );
};

export default CodeCell;
