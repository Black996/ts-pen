import { useContext } from "react";
import CellsContext from "../../context/CellsContext/CellsContext";

interface IProps {
    id:string;
}

const ActionBar:React.FC<IProps> = ({id})=> {
    const {cellsContextManager:{moveCell,removeCell}} = useContext(CellsContext);
    return (
        <>
            <button onClick={()=>moveCell(id,"up")}>Up</button>
            <button onClick={()=>moveCell(id,"down")}>Down</button>
            <button onClick={()=>removeCell(id)}>Delete</button>
        </>
    )
}

export default ActionBar;