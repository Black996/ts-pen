import { CellsStoreAction, CellVariant, ICell, InsertCellAfterPayload, UpdateCellPayload } from "./cellsContextTypes";
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

function updateCell(state: ICellsState, payload: UpdateCellPayload) {
    const { cellId, content } = payload;
    if (!cellId) throw new Error("No Such Cell with Provided Id");
    return { cells: { ...state.cells, [cellId]: { ...state.cells[cellId], content } }, order: state.order }
}


function CellsReducer(state: ICellsState, action: CellsStoreAction): ICellsState {
    const { type, payload } = action;

    switch (type) {
        case CellsStoreActions.InsertCellAfter:
            return insertCellAfter(state, payload);
        case CellsStoreActions.UpdateCell:
            return updateCell(state, payload);
        default:
            return state;
    }
}

export default CellsReducer;