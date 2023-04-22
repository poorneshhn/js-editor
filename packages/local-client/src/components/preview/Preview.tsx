import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
    <head>
    <style>
    body { background-color: white; }
    </style>
    </head>
    <body>
    <div id="root"></div>
    <script>
    const handleError = (err) => {
      let element = document.getElementById("root");
      element.innerHTML = '<div style="color: red">' + err + '</div>'
      console.error(err)
    }
      window.addEventListener("error", (e) => {
        handleError(e.error)
      }, false)
      window.addEventListener("message", (e) => {
        try{
          eval(e.data)
        }catch(err) {
          handleError(err)
        }
      }, false)
    </script>
    </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }, 50);
  }, [code, err]);

  return (
    <div className="preview-wrapper">
      <iframe title="code-preview" srcDoc={html} ref={iframeRef} />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
