import React from "react";
import classes from "./additionalText.module.css";
import Link from "next/link";

const AdditionalText = (props) => {
  const { additionalText, login, signup, href } = props;
  return (
    <div className={classes.additional}>
      {additionalText}
      <Link href={href}>
        {login && "LOGIN"} {signup && "SIGNUP"} 
      </Link>
    </div>
  );
};

export default AdditionalText;
