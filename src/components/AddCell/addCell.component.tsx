import { useContext } from "react";
import CellsContext from "../../context/CellsContext/CellsContext";
import "./addCell.styles.css";

interface IProps {
    previousCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<IProps> = ({ previousCellId, forceVisible }) => {
    const { cellsActionsManager } = useContext(CellsContext);
    return <div className={`add-cell${forceVisible ? " force-visible" : ""}`}>
        <div className="add-buttons">
            <button onClick={() => cellsActionsManager.insertCellAfterAction({ previousCellId, cellType: "code" })}>Code +</button>
            <button onClick={() => cellsActionsManager.insertCellAfterAction({ previousCellId, cellType: "markup" })}>Text +</button>
        </div>
        <div className="divider"></div>
    </div>

}

export default AddCell;