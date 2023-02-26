import React from "react";
import classes from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    // <div className={classes.loadingSpinnerOverlay}>
      <div className={classes.dualRing}></div>
    // </div>
  );
};

export default LoadingSpinner;
