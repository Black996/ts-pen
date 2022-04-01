import React from "react";
import "./preview.styles.css";

interface IProps {
  code: string;
}

const Preview: React.FC<IProps> = ({ code }) => {
  const iframe = React.useRef<any>();

  React.useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (evt)=>{
          try{
            eval(evt.data)
          }catch(error){
            const root = document.getElementById("root");
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
            console.error(error);
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
    </div>
  );
};

export default Preview;
