import React, { useReducer } from "react";

import CellsContext from "./CellsContext";

import { ICellsActionManager, InsertCellAfterPayload, UpdateCellPayload, RemoveCellPayload, MoveCellPayload } from "./cellsContextTypes";
import { CellsStoreActions } from "./actionTypes";
import CellsReducer from "./CellsReducer";


const CellsContextProvider: React.FC = ({ children }) => {
    const [cellsStore, dispatch] = useReducer<typeof CellsReducer>(CellsReducer, { cells: {}, order: [] })

    function insertCellAfterAction(payload: InsertCellAfterPayload) {
        dispatch({ type: CellsStoreActions.InsertCellAfter, payload })
    }

    function updateCellAction(payload: UpdateCellPayload) {
        dispatch({ type: CellsStoreActions.UpdateCell, payload });
    }

    function removeCellAction(payload: RemoveCellPayload) {
        dispatch({ type: CellsStoreActions.RemoveCell, payload });
    }

    function moveCellAction(payload: MoveCellPayload) {
        dispatch({ type: CellsStoreActions.MoveCell, payload })
    }

    const cellsActionsManager: ICellsActionManager = {
        moveCellAction
        , updateCellAction
        , removeCellAction
        , insertCellAfterAction
    }


    return (
        <CellsContext.Provider value={{ cellsStore, cellsActionsManager }}>
            {children}
        </CellsContext.Provider >
    )
}

export default CellsContextProvider;