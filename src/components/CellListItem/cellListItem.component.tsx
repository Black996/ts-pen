import { ICell } from "../../context/CellsContext/cellsContextTypes";
import CodeArea from "../CodeArea";
import TextEditor from "../TextEditor";

interface IProps {
    cell: ICell;
}

const CellsListItem: React.FC<IProps> = ({cell}) => {
    let child: JSX.Element;

    if(cell.type == "code"){
        child = <CodeArea/>;
    }else {
        child = <TextEditor/>
    }
    return child;
}

export default CellsListItem;