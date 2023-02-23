import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let inputClasses;
  if (props.validity === "true") {
    inputClasses = classes.wrongInput;
  } else {
    inputClasses = classes.inputGroup;
  }
  return (
    <div className={inputClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
    </div>
  );
};

export default Input;
