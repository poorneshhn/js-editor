import "./text-editor.css";
import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../../state";
import useActions from "../../hooks/use-actions";
interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const markdownEditorRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      if (markdownEditorRef.current?.contains(e.target as Node)) {
        return;
      }
      setIsEditing(false);
    };

    document.addEventListener("click", clickListener, { capture: true });
    return () => {
      document.removeEventListener("click", clickListener, { capture: true });
    };
  }, []);

  const handleTextChange = (val: string) => {
    updateCell(cell.id, val);
  };

  if (isEditing) {
    return (
      <div className="text-editor" ref={markdownEditorRef}>
        <MDEditor
          value={cell.content}
          onChange={(val) => handleTextChange(val || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={(e) => setIsEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
