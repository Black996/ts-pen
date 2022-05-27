import { CellsStoreAction, CellVariant, ICell, InsertCellAfterPayload, RemoveCellPayload, UpdateCellPayload } from "./cellsContextTypes";
import { v4 as uuid } from "uuid";
import { CellsStoreActions } from "./actionTypes";

interface ICellsState {
    cells: { [id: string]: ICell };
    order: string[]
}

function insertCellAfter(state: ICellsState, { cellType, previousCellId }: InsertCellAfterPayload) {
    const id = uuid();
    const nextCellIdx = state.order.findIndex((cellId) => cellId == previousCellId);

    if (nextCellIdx < 0 || previousCellId == null) {
        state.order.unshift(id);
    } else {
        state.order.splice(nextCellIdx + 1, 0, id)
    }

    return { cells: { ...state.cells, [id]: { id, content: "", cellType } }, order: state.order };
}

function updateCell(state: ICellsState, { cellId, content }: UpdateCellPayload) {
    if (!cellId) {
        console.info("No Such Cell")
        return state;
    }
    return { cells: { ...state.cells, [cellId]: { ...state.cells[cellId], content } }, order: state.order }
}

function removeCell(state: ICellsState, { cellId }: RemoveCellPayload) {
    if (!cellId) {
        console.info("No Such Cell");
        return state;
    }

    state.order.filter((id) => id !== cellId);
    delete state.cells[cellId];

    return state;
}


function CellsReducer(state: ICellsState, action: CellsStoreAction): ICellsState {
    const { type, payload } = action;

    switch (type) {
        case CellsStoreActions.InsertCellAfter:
            return insertCellAfter(state, payload);
        case CellsStoreActions.UpdateCell:
            return updateCell(state, payload);
        case CellsStoreActions.RemoveCell:
            return removeCell(state, payload);
        default:
            return state;
    }
}

export default CellsReducer;