import { useContext } from "react";
import CellsContext from "../../context/CellsContext/CellsContext";
import "./addCell.styles.css";

interface IProps {
    previousCellId:string | null;
    forceVisible?: boolean;
}

const AddCell:React.FC<IProps> = ({previousCellId,forceVisible})=> {
    const {cellsContextManager}=useContext(CellsContext);
    return <div className={`add-cell${forceVisible ? " force-visible":""}`}>
        <div className="add-buttons">
            <button onClick={()=>cellsContextManager.insertCellAfter(previousCellId,"code")}>Code +</button>
            <button onClick={()=>cellsContextManager.insertCellAfter(previousCellId,"markup")}>Text +</button>
        </div>
        <div className="divider"></div>
    </div>

}

export default AddCell;