import React, { useState} from "react";

import CellsContext from "./CellsContext";
import { swap } from "../helpers";

import { ICell, ICellsContextManager,Direction} from "./cellsContextTypes";


const CellsContextProvider: React.FC = ({children}) => {
    const [cells,setCells] = useState<{[key:string]:ICell}>({})
    const [order,setOrder] = useState<string[]>([])

    function insertCell(cell:ICell){
        const newCells = {...cells, cell};
        const orderOfCells = [...order,cell.id];

        setCells(newCells);
        setOrder(orderOfCells);
    }

    function updateCell(id:string , content:string){
        const cellsCopy = {...cells, [id]:{...cells[id],content}};
        setCells(cellsCopy);
    }
    
    function removeCell(id:string){
      const cellsCopy = {...cells};
      const orderOfCells = order.filter((cellId)=> cellId !== id)

      delete cellsCopy[id];

      setCells(cellsCopy);
      setOrder(orderOfCells);
    }

    function moveCell(id:string,direction:Direction){
        const orderOfCells = [...order];
        const lastIndex = (orderOfCells.length - 1);
        const orderIndex = orderOfCells.findIndex((currentId:string)=>currentId === id);
        const targetIndex = direction == "up" ? orderIndex - 1 : orderIndex + 1;

        if(orderIndex === -1) return console.error("This Cell Doesn't Exist!")
        if(orderOfCells.length == 0) return console.info("No cells to move around!");
        if(orderOfCells.length == 1) return console.info("There's only one cell in the collection");


        if((orderIndex == lastIndex) && direction == "down") return console.info("The Cell is already the last cell!")
        if((orderIndex == 0) && direction == "up") return console.info("The Cell is already the first cell!")
        
        if(direction === "up"){
            swap({arr:orderOfCells,leftIndex:targetIndex,rightIndex:orderIndex})
        } else if(direction === "down"){
            swap({arr:orderOfCells,leftIndex:orderIndex,rightIndex:targetIndex})
        }
    }

    function cellsContextManager():ICellsContextManager{
        return {
            moveCell
            , insertCell
            , updateCell
            , removeCell
        }
    }


    return (
        <CellsContext.Provider value={{cells,order,cellsContextManager}}>
            {children}
        </CellsContext.Provider>
    )
}

export default CellsContextProvider;