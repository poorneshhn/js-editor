import React from "react";
import { Cell } from "../../../state";
import ActionBar from "../../action-bar/ActionBar";
import CodeCell from "../../code-cell/CodeCell";
import TextEditor from "../../text-editor/TextEditor";
import "./cell-list-item.css";
interface cellListItemProps {
  cell: Cell;
}
const CellListItem: React.FC<cellListItemProps> = ({ cell }) => {
  return (
    <div className="cell-list-item">
      {cell.type === "code" ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
