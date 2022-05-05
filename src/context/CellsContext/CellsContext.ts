import { createContext } from "react";
import { ICellsContext, Direction, IInsertCell} from "./cellsContextTypes";

const initialVals: ICellsContext = {
    // loading:false,
    // error:false,
    cells: {},
    order:[],
    cellsContextManager:{
            moveCell:(id: string, direction:Direction)=>undefined,
            insertCell:(cell:IInsertCell)=>undefined,
            updateCell:(id: string, content:string)=>undefined,
            removeCell:(id:string)=>undefined
        }
    }


const CellsContext = createContext(initialVals);

export default CellsContext;