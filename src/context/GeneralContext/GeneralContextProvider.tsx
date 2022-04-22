import React, { useState} from "react";

import GeneralContext from "./GeneralContext";


const CellsContextProvider: React.FC = ({children}) => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const updateErrorStatus = (error:string) => setError(error);
    const updateLoadingStatus = (status:boolean) => setLoading(status);


    return (
        <GeneralContext.Provider value={{error,loading,setError,setLoading}}>
            {children}
        </GeneralContext.Provider>
    )
}

export default CellsContextProvider;