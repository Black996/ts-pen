import { Fragment } from "react";
import { useGetLoadingAndErrorStates } from "../../hooks/useGetLoadingAndErrorState";
import { useSelectOrderedCellsList } from "../../hooks/useSelectCellsList";
import AddCell from "../AddCell";
import CellListItem from "../CellListItem";
import "./cellList.styles.css";

const CellList: React.FC = () => {
   const orderedCells = useSelectOrderedCellsList()
   const { loading, error } = useGetLoadingAndErrorStates();

   if (loading) return <>Loading...</>

   const cellItemsList = orderedCells.map((cell) => (
      <Fragment key={cell.id}>
         <CellListItem cell={cell} />
         <AddCell previousCellId={cell.id} />
      </Fragment>
   ))


   if (!orderedCells) return <div>Loading...</div>

   return (
      <div className="cell-list">
         <AddCell forceVisible={orderedCells.length == 0} previousCellId={null} />
         {cellItemsList}
      </div>
   )
}

export default CellList;