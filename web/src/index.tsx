import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
