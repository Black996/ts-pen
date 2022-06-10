import React from "react";
import "./preview.styles.css";

interface IProps {
  code: string;
  error: string;
}

const Preview: React.FC<IProps> = ({ code, error }) => {
  const iframe = React.useRef<any>();

  React.useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => iframe.current.contentWindow.postMessage(code, "*"), 20);
  }, [code]);

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      function handleError(error){
            const root = document.getElementById("root");
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
            console.error(error);
      }
        window.addEventListener('error', (evt)=>{
          evt.preventDefault();
            handleError(evt.error);
        })
        window.addEventListener('message', (evt)=>{
          try{
            eval(evt.data)
          }catch(error){
            handleError(error);
          }
        },false) 
      </script> 
    </body>
  </html>
  `;

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        title="Playground"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
