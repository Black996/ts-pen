import { ITUpdateCellParams} from "../../src/context/cellsContextTypes";
import { initializeState } from "./index.test";

function updateCell({id , content, state}:ITUpdateCellParams){
    const {cells, order} = state;

    if(!(id in cells)) return console.info("No such cell in the app!");

    return {cells: {...cells, [id]:{...cells[id],content}},order};
}

describe("updateCell function tests",()=>{
    const getState = initializeState();

    it('updates the content of a cell in the object of cells without changing its order', () => {
        const id = "a"; 
        const content = "updated content";
        const state = getState();
        const {cells,order} = state;

        expect(updateCell({id,content,state})).toEqual(
            {
            cells:{...cells, [id]: {...cells[id], content:"updated content"}}
            , order
            } 
        );
    });
});