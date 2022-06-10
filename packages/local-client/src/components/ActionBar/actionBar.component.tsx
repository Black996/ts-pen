import { useContext, useEffect } from "react";
import CellsContext from "../../context/CellsContext/CellsContext";

interface IProps {
    id: string;
}

const ActionBar: React.FC<IProps> = ({ id }) => {
    const { cellsActionsManager: { moveCellAction, removeCellAction } } = useContext(CellsContext);

    return (
        <>
            <button onClick={() => moveCellAction({ cellId: id, direction: "up" })}>Up</button>
            <button onClick={() => moveCellAction({ cellId: id, direction: "down" })}>Down</button>
            <button onClick={() => removeCellAction({ cellId: id })}>Delete</button>
        </>
    )
}

export default ActionBar;