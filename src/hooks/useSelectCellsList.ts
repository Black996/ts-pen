import { useContext } from "react";
import CellsContext from "../context/CellsContext/CellsContext";

export function useSelectCellsList(){
    const {cells,order} = useContext(CellsContext);
    
    const orderedCellsList = order.map((id)=>cells[id]);
    

    return orderedCellsList;
}