import React, { useContext } from "react";
import "./CodeArea.styles.css";
import esBuildBundle from "../../bundler";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";
import { ICell } from "../../context/CellsContext/cellsContextTypes";
import CellsContext from "../../context/CellsContext/CellsContext";

interface IProps {
  cell: ICell;
}

const InteractiveCodeEditor: React.FC<IProps> = ({cell}) => {
  const {cellsContextManager} = useContext(CellsContext);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let timerId = setTimeout(async () => {
      const outputCode = await esBuildBundle(cell.content);
      if (outputCode) {
        setCode(outputCode.code);
        setError(outputCode.error);
      }
    }, 750);

    return () => clearTimeout(timerId);
  }, [cell.content]);

  function onChange(value: string) {
    cellsContextManager.updateCell(cell.id,value);
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
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default InteractiveCodeEditor;
