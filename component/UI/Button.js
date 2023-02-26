import React from "react";
import classes from "./button.module.css";

const Button = (props) => {
  const { loginFormValid, signUpFormValid, isClicked } = props;
  return (
    <div className={classes.btn}>
      <button
        type={props.type}
        disabled={!(loginFormValid || signUpFormValid) || isClicked}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
