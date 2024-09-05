import React from "react";
import "./App.less";
import { HashRouter } from 'react-router-dom'
import RouterView from "./router";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <RouterView/>
      </HashRouter>
    </div>
  );
}

export default App;
