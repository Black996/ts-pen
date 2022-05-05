export type Cells = {[key:string]:ICell};
export type CellsContextState = {cells: Cells, order:string[]};

export interface ICell {
    id:string;
    type:"code" | "markup";
    content: string;
}

export type Direction = "up" | "down";

export interface ICellsContextManager {
    insertCell: (cell:IInsertCell )=>void;
    updateCell: (id: string, content:string)=> void;
    removeCell: (id:string)=> void;
    moveCell:(id:string, direction:Direction)=>void;
}

export type CellsContextManagerFn = ()=> ICellsContextManager;

export interface ICellsContext {
    // loading: boolean;
    // error:boolean;
    cells:{[key:string] : ICell};
    order: string[];
    cellsContextManager:CellsContextManagerFn;
}


export interface IInsertCell extends Omit<ICell,"id"> {}

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
    id:string;
    direction:Direction;
    state: CellsContextState;
}

export interface ITRemoveCellParams {
    id:string;
    state: CellsContextState;
}