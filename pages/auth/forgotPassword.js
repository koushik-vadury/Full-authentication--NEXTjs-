import React, { useEffect } from "react";
import classes from "./login.module.css";
import Input from "../../component/UI/Input";
import AdditionalText from "../../component/UI/AdditionalText";
import Button from "../../component/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formDataActions } from "../../store";
import { validateMail } from "../../utils/validators";

export default function ForgotPassword() {
  const { email, loginFormValid } = useSelector((state) => state.formData);
  const dispatch = useDispatch();

  let emailValue = email.value;

  const loginFormHandler = (event) => {
    event.preventDefault();
    console.log({ emailValue });
  };

  useEffect(() => {
    const isValidMail = validateMail(emailValue);

    dispatch(formDataActions.emailIsValid(isValidMail));
    dispatch(formDataActions.setLogInFormValid(isValidMail));
  }, [emailValue, dispatch]);

  return (
    <div className={classes.container}>
      <h2>Forgot password</h2>
      <hr />
      <form className={classes.formInput} onSubmit={loginFormHandler}>
        <Input
          id="email"
          type="email"
          placeholder="Your email"
          label="your email"
          required
          onChange={(event) => {
            dispatch(formDataActions.setEmail(event.target.value));
          }}
          value={email.value}
          onBlur={() => dispatch(formDataActions.emailTouched(true))}
          validity={(!email.isValid && email.isTouched).toString()}
        />
        {!email.isValid && email.isTouched && <p>Enter a valid Email</p>}
        <Button type="submit" loginFormValid={loginFormValid}>
          send email
        </Button>
      </form>
      <AdditionalText
        additionalText="Back to login?"
        href="/auth/login"
        login
      />
    </div>
  );
}
