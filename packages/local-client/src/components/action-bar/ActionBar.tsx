import React from "react";
import useActions from "../../hooks/use-actions";
import ActionButton from "./action-button/ActionButton";
import "./action-bar.css";
interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton
        title="move editor up"
        onClick={() => moveCell(id, "up")}
        buttonIcon={"fa-arrow-up"}
      />
      <ActionButton
        title="move editor down"
        onClick={() => moveCell(id, "down")}
        buttonIcon={"fa-arrow-down"}
      />
      <ActionButton
        title="delete editor"
        onClick={() => deleteCell(id)}
        buttonIcon={"fa-times"}
      />
    </div>
  );
};

export default ActionBar;
