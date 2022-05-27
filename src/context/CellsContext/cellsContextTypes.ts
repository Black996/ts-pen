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

export interface ICellsContextManager {
    updateCell: (id: string, content: string) => void;
    removeCell: (id: string) => void;
    moveCell: (id: string, direction: Direction) => void;
    insertCellAfter: (previousCellId: string | null, cellType: CellVariant) => void;
}

export interface ICellsContext {
    // loading: boolean;
    // error:boolean;
    cells: { [key: string]: ICell };
    order: string[];
    cellsContextManager: ICellsContextManager;
}

export interface ITInsertCellParams {
    cell: ICell;
    state: CellsContextState;
}

export interface ITUpdateCellParams {
    id: string;
    content: string;
    state: CellsContextState;
}

export interface ITMoveCellParams {
    id: string;
    direction: Direction;
    state: CellsContextState;
}

export interface ITRemoveCellParams {
    id: string;
    state: CellsContextState;
}