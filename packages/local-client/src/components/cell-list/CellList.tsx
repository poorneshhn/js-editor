import React, { createContext, useEffect, useState } from "react";
import useActions from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import AddCell from "../add-cell/AddCell";
import ToggleButton from "../basic/toggle-button/ToggleButton";
import CellListItem from "./cell-list-item/CellListItem";
import "./cell-list.css";

const shareCodeDefaultValue = false;
const CellList: React.FC = () => {
  const { fetchCells, setShareCode } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  useEffect(() => {
    fetchCells();
  }, []);

  const handleShareCodeChange = (value: boolean) => {
    setShareCode(value);
  };
  return (
    <div className="cell-list">
      <h3>
        Use "show" function to print <br />
        Example - <code>show("Hello world!")</code>
      </h3>
      <div className="toggle-wrapper">
        <ToggleButton
          defaultValue={shareCodeDefaultValue}
          label="Share code between cells?"
          onChange={(value) => handleShareCodeChange(value)}
        />
      </div>
      <AddCell forceVisible={true} previousCellId={null} />
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
