import { ICell } from "../../context/CellsContext/cellsContextTypes";
import ActionBar from "../ActionBar";
import CodeArea from "../CodeArea";
import TextEditor from "../TextEditor";

interface IProps {
    cell: ICell;
}

const CellsListItem: React.FC<IProps> = ({cell}) => {
    let child: JSX.Element;
    
    if(cell.type == "code"){
        child = <CodeArea cell={cell}/>;
    }else {
        child = <TextEditor cell={cell}/>
    }
    return <div>
        <ActionBar id={cell.id}/>
        {child}
    </div>;
}

export default CellsListItem;