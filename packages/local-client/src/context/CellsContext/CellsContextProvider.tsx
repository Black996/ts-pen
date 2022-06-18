import React, { useReducer } from "react";

import CellsContext from "./CellsContext";

import { ICellsActionManager, InsertCellAfterPayload, UpdateCellPayload, RemoveCellPayload, MoveCellPayload, ICell, PresistFetchedCellsPayload } from "./cellsContextTypes";
import { CellsStoreActions } from "./actionTypes";
import CellsReducer from "./CellsReducer";
import { useEffect } from "react";
import axios from "axios";


const CellsContextProvider: React.FC = ({ children }) => {
    const [cellsStore, dispatch] = useReducer<typeof CellsReducer>(CellsReducer, { cells: {}, order: [], loading: false, error: "" })
    console.log(cellsStore);


    useEffect(() => {
        dispatch({ type: CellsStoreActions.StartCellsFetching })
        axios.get<ICell[]>("http://localhost:4005/cells").then((res) => {
            dispatch({ type: CellsStoreActions.FinishCellsFetching, payload: { cells: res.data } })
        }).catch((err) => {
            if (err instanceof Error) dispatch({ type: CellsStoreActions.ErrorCellsFetching, payload: { error: err.message } });
        })
    }, [])

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