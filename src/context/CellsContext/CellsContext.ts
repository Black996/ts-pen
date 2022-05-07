import { createContext } from "react";
import { ICellsContext, Direction} from "./cellsContextTypes";

const initialVals: ICellsContext = {
    // loading:false,
    // error:false,
    cells: {},
    order:[],
    cellsContextManager:{
            moveCell:(id: string, direction:Direction)=>undefined,
            updateCell:(id: string, content:string)=>undefined,
            removeCell:(id:string)=>undefined,
            insertCellAfter:(previousCellId:string | null, cellType:"code" | "markup")=>undefined
        }
    }


const CellsContext = createContext(initialVals);

export default CellsContext;