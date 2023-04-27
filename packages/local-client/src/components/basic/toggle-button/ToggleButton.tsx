import React from "react";
import "./toggle-button.css";

interface toggleButtonProps {
  onChange: (e: boolean) => void;
  label: string;
  defaultValue: boolean;
}

const ToggleButton: React.FC<toggleButtonProps> = ({
  onChange,
  label,
  defaultValue,
}) => {
  return (
    <div className="toggle-container">
      <span>{label}</span>
      <label className="switch" title="share code between cells">
        <span className="toggle-label"></span>
        <div>
          <input
            type="checkbox"
            defaultChecked={defaultValue}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="slider round">
            <span className="yes">Yes</span>
            <span className="no">No</span>
          </span>
        </div>
      </label>
    </div>
  );
};

export default ToggleButton;
