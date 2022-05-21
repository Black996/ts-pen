import React, { useReducer } from "react";
import BundleContext from "./BundleContext";
import { BundleAction, BundleActionTypes, BundleCompleteAction, BundleResponse, BundleStartAction, IBundleState } from "./bundleContextTypes";
import esBuildBundle from "../../bundler";


function codeReducer(state: IBundleState, action: BundleAction): IBundleState {
    const { type, payload } = action;
    const { cellId } = payload;

    switch (type) {
        case BundleActionTypes.BUNDLE_START:
            return { ...state, [cellId]: { loading: true, code: "", err: "" } };
        case BundleActionTypes.BUNDLE_COMPLETE:
            const { bundle } = payload as any;
            return { ...state, [cellId]: { ...bundle, loading: false } };
        default:
            return state;
    }
}


const BundleContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer<typeof codeReducer>(codeReducer, {});

    function onStartCodeTraspile(cellId: string, input: string) {
        dispatch({ type: BundleActionTypes.BUNDLE_START, payload: { cellId } });
        return esBuildBundle(input);
    }

    function onCodeTraspilation(res: BundleResponse, cellId: string) {
        if (res) dispatch({ type: BundleActionTypes.BUNDLE_COMPLETE, payload: { cellId, bundle: { code: res.code, err: res.error } } });
    }

    return (
        <BundleContext.Provider value={{ state, onStartCodeTraspile, onCodeTraspilation }}>
            {children}
        </BundleContext.Provider>
    )
}

export default BundleContextProvider;