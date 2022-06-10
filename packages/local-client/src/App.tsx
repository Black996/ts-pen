import React from "react";
import CellList from "./components/CellList";
import CodeArea from "./components/CodeArea";
import TextEditor from "./components/TextEditor";
import BundleContextProvider from "./context/BundleContext/BundleContextProvider";
import CellsContextProvider from "./context/CellsContext/CellsContextProvider";

const App: React.FC = () => {
  return (
    <>
      <CellsContextProvider>
        <BundleContextProvider>
          {/* <CodeArea /> */}
          {/* <TextEditor /> */}
          <CellList />
        </BundleContextProvider>
      </CellsContextProvider>
    </>
  );
};

export default App;