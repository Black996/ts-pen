import { ITInsertCellParams} from "../../src/context/CellsContext/cellsContextTypes";
import { initializeState } from "./index.test";

function insertCell({cell,state}:ITInsertCellParams){
    const {order, cells} = state;
    const {id} = cell;

    return {cells:{...cells,[id]:cell},order:[...order, cell.id]};
}

describe("insertCell function tests",()=>{
    const getState = initializeState();
            
    it('inserts a new cell in the object of cells and save its order in the order array', () => {
        const id = "d"; 
        const state = getState();
        const {cells, order} = state;

        expect(insertCell({cell:{id, type:"code",content:""}, state})).toEqual(
            {
            cells:{...cells, [id]: {id:"d",type:"code", content:""} }
            , order:[...order,id]
            } 
        );
    });
})