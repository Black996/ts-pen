import { createContext } from "react";
import { IBundleContextValues } from "./bundleContextTypes";


const BundleContext = createContext({} as IBundleContextValues);

export default BundleContext;