import { CellsStoreAction, CellVariant, ICell, InsertCellAfterPayload } from "./cellsContextTypes";
import { v4 as uuid } from "uuid";
import { CellsStoreActions } from "./actionTypes";

interface ICellsState {
    cells: { [id: string]: ICell };
    order: string[]
}

function insertCellAfter(state: ICellsState, payload: InsertCellAfterPayload) {

    const id = uuid();
    const { cellType, previousCellId } = payload;
    const nextCellIdx = state.order.findIndex((cellId) => cellId == previousCellId);

    if (nextCellIdx < 0 || previousCellId == null) {
        state.order.unshift(id);
    } else {
        state.order.splice(nextCellIdx + 1, 0, id)
    }

    return { cells: { ...state.cells, [id]: { id, content: "", cellType } }, order: state.order };
}



function CellsReducer(state: ICellsState, action: CellsStoreAction): ICellsState {
    switch (action.type) {
        case CellsStoreActions.InsertCellAfter:
            const { payload } = action;
            return insertCellAfter(state, payload);
        default:
            return state;
    }
}

export default CellsReducer;