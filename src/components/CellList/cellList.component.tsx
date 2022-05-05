import { useContext, useEffect } from "react";
import CellsContext from "../../context/CellsContext/CellsContext";
import { useSelectCellsList } from "../../hooks/useSelectCellsList";
import CellListItem from "../CellListItem";

const CellList: React.FC = () => {
   const cells = useSelectCellsList();
   const {cellsContextManager} = useContext(CellsContext);
   const cellFns = cellsContextManager()
   
   
   if(!cells) return <div>Loading...</div>

   return(
      <div>
         <h1 onClick={()=>cellFns.insertCell({content:"console.log(\"Generated a cell\")", type:"code"})}>Generate A Cell</h1>
         {cells.map((cell, idx)=><CellListItem key={idx} cell={cell}/>)}
      </div>
   ) 
}

export default CellList;