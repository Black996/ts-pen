import { createContext } from "react";
import { ICellsContext, Direction, ICell} from "./cellsContextTypes";

const initialVals: ICellsContext = {
    // loading:false,
    // error:false,
    cells: {},
    order:[],
    cellsContextManager:()=>{
        return {
            moveCell:(id: string, direction:Direction)=>undefined,
            insertCell:(cell:ICell)=>undefined,
            updateCell:(id: string, content:string)=>undefined,
            removeCell:(id:string)=>undefined
        }
    },
}


const CellsContext = createContext(initialVals);

export default CellsContext;