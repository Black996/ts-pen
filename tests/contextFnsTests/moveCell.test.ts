import { ITMoveCellParams} from "../../src/context/cellsContextTypes";
import { initializeState } from "./index.test";
import {swap} from "../../src/helpers";

function moveCell({id,direction, state}: ITMoveCellParams){
    const {cells, order} = state;

    if(order.length == 0) return console.info("No cells to move around!");
    if(order.length == 1) return console.info("There's only one cell in the collection");

    const lastIndex = (order.length - 1);
    const orderIndex = order.findIndex((currentId:string)=>currentId === id);
    const targetIndex = direction == "up" ? orderIndex - 1 : orderIndex + 1;

    if(orderIndex === -1) return console.error("This Cell Doesn't Exist!");


    if((orderIndex == lastIndex) && direction == "down") return console.info("The Cell is already the last cell!");
    if((orderIndex == 0) && direction == "up") return console.info("The Cell is already the first cell!");
    
    if(direction === "up"){
        swap({arr:order,leftIndex:targetIndex,rightIndex:orderIndex})
    } else if(direction === "down"){
        swap({arr:order,leftIndex:orderIndex,rightIndex:targetIndex})
    }

    return {cells,order}
}

describe("moveCell function tests",()=>{
    const getState = initializeState();
            
    it('swaps a cell up in the order array', () => {
        const state = getState()
        const {cells} = state;

        const newOrder = ["b","a","c"]

        expect(moveCell({id:"b",direction:"up", state})).toEqual(
            {
            cells
            , order:newOrder
            } 
        );
    });
})