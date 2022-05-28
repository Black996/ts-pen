import { useContext } from "react";
import CellsContext from "../context/CellsContext/CellsContext";

export function useSelectCellsList() {
    const { cellsStore: { order, cells } } = useContext(CellsContext);

    const orderedCellsList = order.map((id) => cells[id]);


    return orderedCellsList;
}