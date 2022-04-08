import React from "react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import "./textEditor.styles.css";

const TextEditor: React.FC = () => {
  const textEditorDivRef = React.useRef<HTMLDivElement | null>(null);

  const [value, setValue] = React.useState("# Header");
  const [editIsActive, setEditIsActive] = React.useState(false);

  React.useEffect(()=>{
    function listener(event:MouseEvent){
      if(textEditorDivRef.current && event.target && textEditorDivRef.current.contains(event.target as Node)) {
        return
      }
      setEditIsActive(false);
    }
    window.addEventListener("click",listener, {capture:true});

    return ()=> window.removeEventListener("click",listener, {capture:true});
  })

  console.log(editIsActive);
  
  if(editIsActive) return (
   <div className="text-editor" ref={textEditorDivRef}>
    <MDEditor onChange={(val) => setValue(val || "")} value={value} />
   </div>
  );
  

  return (
    <div className="text-editor card"
      onClick={() => setEditIsActive(true)}
    >
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>

    </div>
  );
};

export default TextEditor;
