import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  buttonIcon: string;
  title: string;
}
const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  buttonIcon,
  title,
}) => {
  return (
    <button
      title={title}
      className="button is-primary is-small"
      onClick={onClick}
    >
      <span className="icon">
        <i className={`fas ${buttonIcon}`}></i>
      </span>
    </button>
  );
};

export default ActionButton;
