import React from "react";
import classes from "./loader.module.css";
import { MoonLoader } from "react-spinners";
function Loader() {
  return (
    <div className={classes.loader}>
      <MoonLoader color="black" size={30} />
    </div>
  );
}

export default Loader;
