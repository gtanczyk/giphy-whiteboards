import React from 'react';
import './App.css';
import PluginRoot from "./PluginRoot";
import Sidebar from "./Sidebar";

function App() {
  if (window.location.search === "?sidebar") {
    return <Sidebar />
  } else if  (window.location.search === "") {
    return <PluginRoot />
  } else {
    return null;
  }
}

export default App;
