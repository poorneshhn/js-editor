import React from "react";
import useActions from "../../hooks/use-actions";
import "./add-cell.css";
interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
const AddCell: React.FC<AddCellProps> = ({
  previousCellId,
  forceVisible = false,
}) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible === true ? "forceVisible" : ""}`}>
      <div className="add-cell-line" />
      <div className="add-cell-button-wrapper">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
    </div>
  );
};

export default AddCell;
