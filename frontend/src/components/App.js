import React from "react";
import { BrowserRouter } from "react-router-dom";
import PrimaryLayoutContainerComponent from "../containers/PrimaryLayoutContainerComponent";

const App = (props) => {
  return (
    <BrowserRouter>
      <PrimaryLayoutContainerComponent {...props} />
    </BrowserRouter>
  );
};

export default App;
