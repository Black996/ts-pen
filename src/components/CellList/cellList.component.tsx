import { Fragment } from "react";
import { useSelectCellsList } from "../../hooks/useSelectCellsList";
import AddCell from "../AddCell";
import CellListItem from "../CellListItem";

const CellList: React.FC = () => {
   const cells = useSelectCellsList();

   const cellItemsList = cells.map((cell) => (
      <Fragment key={cell.id}>
         <CellListItem cell={cell} />
         <AddCell previousCellId={cell.id} />
      </Fragment>
   ))


   if (!cells) return <div>Loading...</div>

   return (
      <div>
         <AddCell forceVisible={cells.length == 0} previousCellId={null} />
         {cellItemsList}
      </div>
   )
}

export default CellList;