import { ICell } from "../../../context/CellsContext/cellsContextTypes";
import { useSelectOrderedCellsList } from "../../../hooks/useSelectCellsList";

export function useGetCumulativeCode(cell: ICell) {

    function getShowFn() {
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

    function getDummyShowFn() {
        return `function show(){}`
    }

    const cumulativeCellsCode = useSelectOrderedCellsList({ cellType: "code", breakPoint: cell.id }).map((c) => {
        return c.id !== cell.id ? cell.content + `\n${getDummyShowFn()}` : cell.content + `\n${getShowFn()}`
    })
    return cumulativeCellsCode.join("\n");
}