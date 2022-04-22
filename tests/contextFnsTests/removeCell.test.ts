import { ITRemoveCellParams} from "../../src/context/CellsContext/cellsContextTypes";
import { initializeState } from "./index.test";


function removeCell({id, state}:ITRemoveCellParams){
    const {cells, order} =  state;
    const index = order.findIndex((currentIdx) => currentIdx == id);

    if(index === -1) return false;
    order.splice(index,1);

    delete cells[id];

    return cells;
}

describe("deleteCell function tests",()=>{
    const getState = initializeState();

    it('confirm the deletion of a cell in the object of cells', () => {
        const id = "a" 
        const state = getState();
        const {cells} = state;
        delete cells[id];

        expect(removeCell({id, state})).toEqual(cells);
    });

    it('confirm the deletion of a cell in the order array', () => {
        const id = "a" 
        const state = getState();
        const {order} = state;
        removeCell({id,state});

        expect(order).not.toContain(id);
    });

    it("if a cell doesn't exist then return false upon removal atttempt", () => {
        const state = getState();
        expect(removeCell({id: "nonExistentId", state})).toBeFalsy();
    });
})