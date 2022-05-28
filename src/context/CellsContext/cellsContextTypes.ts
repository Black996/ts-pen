import { CellsStoreActions } from "./actionTypes";

export type Cells = { [key: string]: ICell };
export type CellsContextState = { cells: Cells, order: string[] };

export type CellVariant = "code" | "markup";


export type InsertCellAfterPayload = { previousCellId: string | null, cellType: CellVariant };
export type RemoveCellPayload = { cellId: string };
export type MoveCellPayload = { cellId: string, direction: Direction };
export type UpdateCellPayload = { cellId: string, content: string };

interface IInsertCellAfterAction {
    type: CellsStoreActions.InsertCellAfter;
    payload: InsertCellAfterPayload;
}

interface IRemoveCellAction {
    type: CellsStoreActions.RemoveCell;
    payload: RemoveCellPayload;
}

interface IMoveCellAction {
    type: CellsStoreActions.MoveCell;
    payload: MoveCellPayload;
}

interface IUpdateCellAction {
    type: CellsStoreActions.UpdateCell;
    payload: UpdateCellPayload;
}

export type CellsStoreAction = IInsertCellAfterAction | IRemoveCellAction | IUpdateCellAction | IMoveCellAction;

export interface ICell {
    id: string;
    cellType: CellVariant;
    content: string;
}

export type Direction = "up" | "down";

export interface ICellsActionManager {
    updateCellAction: (payload: UpdateCellPayload) => void;
    removeCellAction: (payload: RemoveCellPayload) => void;
    moveCellAction: (payload: MoveCellPayload) => void;
    insertCellAfterAction: (payload: InsertCellAfterPayload) => void;
}