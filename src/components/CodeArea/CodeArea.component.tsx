import React, { useContext } from "react";
import "./CodeArea.styles.css";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";
import { ICell } from "../../context/CellsContext/cellsContextTypes";
import CellsContext from "../../context/CellsContext/CellsContext";
import BundleContext from "../../context/BundleContext/BundleContext";
import { useSelectOrderedCellsList } from "../../hooks/useSelectCellsList";

interface IProps {
  cell: ICell;
}

const InteractiveCodeEditor: React.FC<IProps> = ({ cell }) => {
  const { cellsActionsManager } = useContext(CellsContext);
  const { state: transpiledObject, onStartCodeTraspile, onCodeTraspilation } = useContext(BundleContext);
  const bundle = transpiledObject[cell.id];

  function getShowHelperFn() {
    return `
    import _React from "react";
    import _ReactDOM from "react-dom";

    function show(value){
      const root = document.querySelector("#root");

      const isObject = typeof value == "object" && value !== null;
      const isReactElement = isObject && (value.$$typeof && value.props);
      
      if(isObject){
        if(isReactElement) return _ReactDOM.render(value,root);
        root.innerHTML = JSON.stringify(value);
      } else root.innerHTML=value;
    }`
  }

  const cumulativeCellsCode = [
    getShowHelperFn()
    , ...useSelectOrderedCellsList({ cellType: "code", breakPoint: cell.id }).map((cell) => cell.content)
  ]
  const stringifiedCumulativeCode = cumulativeCellsCode.join("\n");


  React.useEffect(() => {
    if (!bundle) {
      onStartCodeTraspile(cell.id, stringifiedCumulativeCode)
        .then((res) => onCodeTraspilation(res || { code: "", error: "Something went wrong!" }, cell.id));
      return;
    }
    let timerId = setTimeout(async () => {
      onStartCodeTraspile(cell.id, stringifiedCumulativeCode)
        .then((res) => onCodeTraspilation(res || { code: "", error: "Something went wrong!" }, cell.id));
    }, 750);

    return () => clearTimeout(timerId);
  }, [cell.id, stringifiedCumulativeCode]);

  function onChange(value: string) {
    cellsActionsManager.updateCellAction({ cellId: cell.id, content: value });
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