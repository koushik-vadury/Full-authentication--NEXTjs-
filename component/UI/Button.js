import React from "react";
import classes from "./button.module.css";

const Button = (props) => {
  return (
    <div className={classes.btn}>
      <button
        type={props.type}
        disabled={
          !(props.loginFormValid ? props.loginFormValid : props.signUpFormValid)
        }
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
