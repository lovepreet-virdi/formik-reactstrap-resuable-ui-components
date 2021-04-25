import React from 'react';
import Routers from "./routers";
import { ToastContainer } from "react-toastify";
import "./app.scss";

function App() {
  return (
    <>
      <ToastContainer />
      <Routers />
    </>
  );
}

export default App;
