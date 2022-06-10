import { useContext } from "react";
import CellsContext from "../context/CellsContext/CellsContext";
import { CellVariant } from "../context/CellsContext/cellsContextTypes";

interface IParams {
    cellType?: CellVariant;
    breakPoint?: string;
}

export function useSelectOrderedCellsList({ cellType, breakPoint }: IParams = {}) {
    const { cellsStore: { order, cells } } = useContext(CellsContext);
    // adding one to the limit to include the last element in the found range
    const getCellsUntil = (breakPoint ? order.indexOf(breakPoint) : Infinity) + 1;

    const orderedCellsList = order.map((id) => cells[id]);

    if (!cellType) return orderedCellsList.slice(0, getCellsUntil);
    return orderedCellsList.filter((cell) => cell.cellType == cellType).slice(0, getCellsUntil);
}