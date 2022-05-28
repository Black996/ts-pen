import React, { useContext } from "react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import "./textEditor.styles.css";
import { ICell } from "../../context/CellsContext/cellsContextTypes";
import CellsContext from "../../context/CellsContext/CellsContext";

interface IProps {
  cell: ICell;
}

const TextEditor: React.FC<IProps> = ({ cell }) => {
  const { cellsActionsManager } = useContext(CellsContext);
  const textEditorDivRef = React.useRef<HTMLDivElement | null>(null);

  const [editIsActive, setEditIsActive] = React.useState(false);

  React.useEffect(() => {
    function listener(event: MouseEvent) {
      if (textEditorDivRef.current && event.target && textEditorDivRef.current.contains(event.target as Node)) {
        return
      }
      setEditIsActive(false);
    }
    window.addEventListener("click", listener, { capture: true });

    return () => window.removeEventListener("click", listener, { capture: true });
  })

  console.log(editIsActive);

  if (editIsActive) return (
    <div className="text-editor" ref={textEditorDivRef}>
      <MDEditor
        onChange={(val) => cellsActionsManager.updateCellAction({ cellId: cell.id, content: val || "" })}
        value={cell.content}
      />
    </div>
  );


  return (
    <div className="text-editor card"
      onClick={() => setEditIsActive(true)}
    >
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Enter your text here"} />
      </div>

    </div>
  );
};

export default TextEditor;
