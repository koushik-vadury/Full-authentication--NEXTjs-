import React, { useEffect } from "react";
import classes from "./login.module.css";
import Input from "../../component/UI/Input";
import AdditionalText from "../../component/UI/AdditionalText";
import Button from "../../component/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formDataActions } from "../../store";
import Link from "next/link";
import {
  validateLoginForm,
  validateMail,
  validatePassword,
} from "../../utils/validators";

export default function Login() {
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();

  let emailValue = formData.email.value;
  let passwordValue = formData.password.value;

  const loginFormHandler = (event) => {
    event.preventDefault();
    console.log({ emailValue, passwordValue });
  };

  useEffect(() => {
    const isValidMail = validateMail(emailValue);
    const isValidPassword = validatePassword(passwordValue);
    const loginFormValid = validateLoginForm(emailValue, passwordValue);

    dispatch(formDataActions.emailIsValid(isValidMail));
    dispatch(formDataActions.passwordIsValid(isValidPassword));
    dispatch(formDataActions.setLogInFormValid(loginFormValid));
  }, [emailValue, passwordValue, dispatch]);

  return (
    <div className={classes.container}>
      <h2>Login Required</h2>
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
          value={formData.email.value}
          onBlur={() => dispatch(formDataActions.emailTouched(true))}
          validity={(
            !formData.email.isValid && formData.email.isTouched
          ).toString()}
        />
        {!formData.email.isValid && formData.email.isTouched && (
          <p>Enter a valid Email</p>
        )}
        <Input
          id="password"
          type="password"
          placeholder="Password"
          label="password"
          required
          onChange={(event) => {
            dispatch(formDataActions.setPassword(event.target.value));
          }}
          value={formData.password.value}
          onBlur={() => dispatch(formDataActions.passwordTouched(true))}
          validity={(
            !formData.password.isValid && formData.password.isTouched
          ).toString()}
        />
        {(!formData.password.isValid &&
          formData.password.isTouched &&
          formData.password.value.trim() !== "" && (
            <p>Password must be min 7 char. & max 14 char.</p>
          )) ||
          (formData.password.isTouched &&
            formData.password.value.trim() === "" && <p>Password required</p>)}
        <Link href="/auth/forgotPassword" className={classes.forgot}>
          Forgot password ?
        </Link>
        <Button type="submit" loginFormValid={formData.loginFormValid}>
          Login
        </Button>
      </form>
      <AdditionalText additionalText="Create an account?" signup href="/" />
    </div>
  );
}
