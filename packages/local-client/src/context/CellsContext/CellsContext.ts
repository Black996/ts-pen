import { createContext } from "react";
import { CellsContextState, ICellsActionManager } from "./cellsContextTypes";

const initialVals = {
    cellsStore: { cells: {}, order: [], loading: false, error: "" } as CellsContextState,
    cellsActionsManager: {} as ICellsActionManager

}


const CellsContext = createContext(initialVals);

export default CellsContext;