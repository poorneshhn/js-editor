import React, { useEffect } from "react";
import useActions from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import AddCell from "../add-cell/AddCell";
import CellListItem from "./cell-list-item/CellListItem";
import "./cell-list.css";

const CellList: React.FC = () => {
  const { fetchCells } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <div className="cell-list">
      <AddCell forceVisible={true} previousCellId={null} />
      {/* <AddCell forceVisible={cells.length === 0} previousCellId={null} /> */}
      {cells.map((cell) => {
        return (
          <React.Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CellList;
