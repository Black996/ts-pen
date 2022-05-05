import React from "react";
import CellList from "./components/CellList";
import CodeArea from "./components/CodeArea";
import TextEditor from "./components/TextEditor";
import CellsContextProvider from "./context/CellsContext/CellsContextProvider";

const App: React.FC = () => {
  return (
    <>
    <CellsContextProvider>
      {/* <CodeArea /> */}
      {/* <TextEditor /> */}
      <CellList/>
    </CellsContextProvider>
    </>
  );
};

export default App;
