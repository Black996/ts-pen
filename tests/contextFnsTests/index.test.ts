import {beforeEach} from '@jest/globals';
import { CellsContextState, Cells} from "../../src/context/CellsContext/cellsContextTypes";

export function initializeState(){
    let state:CellsContextState;
    beforeEach(()=>{
        const cells:Cells = { 
                "a":{ id:"a", type:"code", content:""}
                , "b":{ id:"b", type:"markup", content:"m"}
                , "c":{ id:"c", type:"markup", content:"mark"}
            }

        const order = ["a","b","c"];

        state = {cells, order};
    });
    
    return () => state;
}

it("Initialize state object getter", ()=>{
    expect(1).toBe(1);
})