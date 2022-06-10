import { createContext } from "react";

interface IGeneralContext {
    error:string;
    loading:boolean;
    setError:(error:string)=>void;
    setLoading:(loadingState:boolean)=>void;
}

const initialVals: IGeneralContext = {
    loading:false,
    error:"",
    setError:(err)=>undefined,
    setLoading:(loadingState)=>undefined
}


const GeneralContext = createContext(initialVals);

export default GeneralContext;