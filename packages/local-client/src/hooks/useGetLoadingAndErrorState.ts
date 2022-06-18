import { useContext } from "react";
import CellsContext from "../context/CellsContext/CellsContext";

export function useGetLoadingAndErrorStates() {
    const { cellsStore: { loading, error } } = useContext(CellsContext);

    return { loading, error };
}