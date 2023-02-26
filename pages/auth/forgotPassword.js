import React, { useEffect, useState } from "react";
import classes from "./login.module.css";
import Input from "../../component/UI/Input";
import AdditionalText from "../../component/UI/AdditionalText";
import Button from "../../component/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formDataActions } from "../../store";
import { validateMail } from "../../utils/validators";
import LoadingSpinner from "../../component/UI/LoadingSpinner";
import Head from "next/head";

export default function ForgotPassword() {
  const { email, loginFormValid } = useSelector((state) => state.formData);
  const [isClicked, setIsClicked] = useState();
  const dispatch = useDispatch();

  const loginFormHandler = (event) => {
    event.preventDefault();
    // setIsClicked(true);
    console.table(email);
    // setIsClicked(false);
  };
  let emailIsValid = email.isValid;

  useEffect(() => {
    dispatch(formDataActions.loginFormValid(emailIsValid));
  }, [emailIsValid, dispatch]);

  const inputHandleChange = (event) => {
    const { id, value } = event.target;

    let isValid;
    if (id === "email") {
      isValid = validateMail(event.target.value);
    }
    dispatch(
      formDataActions.updateFormData({
        field: id,
        value,
        isValid,
        isTouched: true,
      })
    );
  };
  return (
    <>
      <Head>
        <title>Forgot password</title>
        <meta name="description" content="Forgot password" />
      </Head>

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
            onChange={inputHandleChange}
            onBlur={inputHandleChange}
            value={email.value}
            validity={(!email.isValid && email.isTouched).toString()}
          />
          {!email.isValid && email.isTouched && <p>Enter a valid Email</p>}
          <Button
            type="submit"
            loginFormValid={loginFormValid}
            isClicked={isClicked}
          >
            {isClicked ? <LoadingSpinner /> : "send email"}
          </Button>
        </form>
        <AdditionalText
          additionalText="Back to login?"
          href="/auth/login"
          login
        />
      </div>
    </>
  );
}
