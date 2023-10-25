"use client";
import Auth from "./Auth";
import Home from "./Home";

const Control = () => {
  return <>{true ? <Home /> : <Auth />}</>;
};

export default Control;
