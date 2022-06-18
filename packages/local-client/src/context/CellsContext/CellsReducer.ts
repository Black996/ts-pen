import { CellsStoreAction, ICell, InsertCellAfterPayload, MoveCellPayload, PresistFetchedCellsPayload, RemoveCellPayload, UpdateCellPayload } from "./cellsContextTypes";
import { v4 as uuid } from "uuid";
import { CellsStoreActions } from "./actionTypes";
import { swap } from "../../helpers";

interface ICellsState {
    cells: { [id: string]: ICell };
    order: string[];
    loading: boolean;
    error: string;
}

function insertCellAfter(state: ICellsState, { cellType, previousCellId }: InsertCellAfterPayload) {
    const id = uuid();
    const nextCellIdx = state.order.findIndex((cellId) => cellId == previousCellId);

    if (nextCellIdx < 0 || previousCellId == null) {
        state.order.unshift(id);
    } else {
        state.order.splice(nextCellIdx + 1, 0, id)
    }

    return { cells: { ...state.cells, [id]: { id, content: "", cellType } }, order: state.order, loading: state.loading, error: state.error };
}

function updateCell(state: ICellsState, { cellId, content }: UpdateCellPayload) {
    if (!cellId) {
        console.info("No Such Cell")
        return state;
    }
    return { cells: { ...state.cells, [cellId]: { ...state.cells[cellId], content } }, order: state.order, loading: state.loading, error: state.error };
}

function removeCell(state: ICellsState, { cellId }: RemoveCellPayload) {
    if (!cellId) {
        console.info("No Such Cell");
        return state;
    }

    const orderToRemoveIdx = state.order.findIndex((id) => id == cellId);
    state.order.splice(orderToRemoveIdx, 1);

    delete state.cells[cellId];

    return state;
}


function moveCell(state: ICellsState, { cellId, direction }: MoveCellPayload) {
    if (state.order.length == 1 || state.order.length == 0) {
        console.info(`Move Not Allowed!
             That means that theere are no cells to move or that there's only one cell in the collection`
        );
        return state;
    }

    const lastIndex = (state.order.length - 1);
    const currentIndex = state.order.findIndex((currentId: string) => currentId === cellId);
    const targetIndex = direction == "up" ? currentIndex - 1 : currentIndex + 1;

    if (currentIndex === -1) {
        console.error("This Cell Doesn't Exist!")
        return state;
    }

    if ((currentIndex == lastIndex) && direction == "down") {
        console.info("The Cell is already the last cell!");
        return state;
    } else if ((currentIndex == 0) && direction == "up") {
        console.info("The Cell is already the first cell!");
        return state;
    }

    if (direction === "up") {
        swap({ arr: state.order, leftIndex: targetIndex, rightIndex: currentIndex })
    } else if (direction === "down") {
        swap({ arr: state.order, leftIndex: currentIndex, rightIndex: targetIndex })
    }
    return state;
}

function presistCellsFetching(state: ICellsState, { cells }: PresistFetchedCellsPayload) {
    console.log("cells are:", cells)
    const order = cells.map((cell) => cell.id);
    const cellsObject = cells.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
    }, {} as { [id: string]: ICell })

    return { cells: cellsObject, order, loading: false, error: "" }
}

function CellsReducer(state: ICellsState, action: CellsStoreAction): ICellsState {

    /*  creating a new copy cuz mutating the original object would break the app 
        To reproduce the bug use the original state instead of the copy.
        Note that Deep Copying is needed and shallow copying is not enough
    */

    const stateCopy = { cells: { ...state.cells }, order: [...state.order], loading: false, error: "" };
    switch (action.type) {
        case CellsStoreActions.InsertCellAfter:
            return insertCellAfter(stateCopy, action.payload as InsertCellAfterPayload);
        case CellsStoreActions.UpdateCell:
            return updateCell(stateCopy, action.payload as UpdateCellPayload);
        case CellsStoreActions.RemoveCell:
            return removeCell(stateCopy, action.payload as RemoveCellPayload);
        case CellsStoreActions.MoveCell:
            return moveCell(stateCopy, action.payload as MoveCellPayload);
        case CellsStoreActions.StartCellsFetching:
            return { ...stateCopy, loading: true };
        case CellsStoreActions.FinishCellsFetching:
            return presistCellsFetching(stateCopy, action.payload as PresistFetchedCellsPayload);
        case CellsStoreActions.ErrorCellsFetching:
            return { ...stateCopy, loading: false, error: action.payload.error }
        default:
            return state;
    }
}

export default CellsReducer;