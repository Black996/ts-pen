import { Fragment } from "react";
import { useSelectOrderedCellsList } from "../../hooks/useSelectCellsList";
import AddCell from "../AddCell";
import CellListItem from "../CellListItem";

const CellList: React.FC = () => {
   const orderedCells = useSelectOrderedCellsList()


   const cellItemsList = orderedCells.map((cell) => (
      <Fragment key={cell.id}>
         <CellListItem cell={cell} />
         <AddCell previousCellId={cell.id} />
      </Fragment>
   ))


   if (!orderedCells) return <div>Loading...</div>

   return (
      <div>
         <AddCell forceVisible={orderedCells.length == 0} previousCellId={null} />
         {cellItemsList}
      </div>
   )
}

export default CellList;