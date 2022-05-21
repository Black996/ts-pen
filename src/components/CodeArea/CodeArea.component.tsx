import React, { useContext } from "react";
import "./CodeArea.styles.css";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";
import { ICell } from "../../context/CellsContext/cellsContextTypes";
import CellsContext from "../../context/CellsContext/CellsContext";
import BundleContext from "../../context/BundleContext/BundleContext";

interface IProps {
  cell: ICell;
}

const InteractiveCodeEditor: React.FC<IProps> = ({ cell }) => {
  const { cellsContextManager } = useContext(CellsContext);
  const { state: transpiledObject, onStartCodeTraspile, onCodeTraspilation } = useContext(BundleContext);
  const bundle = transpiledObject[cell.id];


  React.useEffect(() => {
    if (!bundle) {
      onStartCodeTraspile(cell.id, cell.content)
        .then((res) => onCodeTraspilation(res || { code: "", error: "Something went wrong!" }, cell.id));
      return;
    }
    let timerId = setTimeout(async () => {
      onStartCodeTraspile(cell.id, cell.content)
        .then((res) => onCodeTraspilation(res || { code: "", error: "Something went wrong!" }, cell.id));
    }, 750);

    return () => clearTimeout(timerId);
  }, [cell.id, cell.content]);

  function onChange(value: string) {
    cellsContextManager.updateCell(cell.id, value);
  }

  return (
    <Resizable axis="y">
      <div className="main">
        <Resizable axis="x">
          <CodeEditor
            initialValue={cell.content}
            input={cell.content}
            onChange={onChange}
          />
        </Resizable>
        <div className="background-blink-wrapper">
          {!bundle || bundle.loading ?
            (<div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">Loading</progress>
            </div>
            ) : (<Preview code={bundle.code} error={bundle.err} />)}
        </div>
      </div>
    </Resizable>
  );
};

export default InteractiveCodeEditor;