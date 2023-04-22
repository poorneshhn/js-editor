export const showFunctionString = `import _React from "react";
import _ReactDOM from "react-dom/client";
const rootElement = document.getElementById("root");
var show = (value) => {
  if(typeof value === "object") {
    if(value.$$typeof && value.props) {
      const root = _ReactDOM.createRoot(rootElement);
      root.render(value)
    } else {
      rootElement.innerHTML = JSON.stringify(value);
    }
  } else {
    rootElement.innerHTML = value;
  }
}`;

export const showNoop = `var show = (value) => {}`;
