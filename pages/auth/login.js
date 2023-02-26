import React, { useEffect, useState } from "react";
import classes from "./login.module.css";
import Input from "../../component/UI/Input";
import AdditionalText from "../../component/UI/AdditionalText";
import Button from "../../component/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formDataActions } from "../../store";
import Link from "next/link";
import Head from "next/head";
import { validateMail, validatePassword } from "../../utils/validators";
import { useRouter } from "next/router";
import LoadingSpinner from "../../component/UI/LoadingSpinner";
import Notification from "../../component/UI/Notification";

export default function Login() {
  const [isClicked, setIsClicked] = useState();
  const [notification, setNotification] = useState(null);
  const router = useRouter();
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();

  const emailIsValid = formData.email.isValid;
  const passwordIsValid = formData.password.isValid;

  useEffect(() => {
    dispatch(formDataActions.loginFormValid(emailIsValid && passwordIsValid));
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [emailIsValid, passwordIsValid, dispatch, notification]);

  const inputHandleChange = (event) => {
    const { id, value } = event.target;
    let isValid;
    if (id === "email") {
      isValid = validateMail(event.target.value);
    } else if (id === "password") {
      isValid = validatePassword(event.target.value);
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
  const loginFormHandler = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email.value,
        password: formData.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setIsClicked(false);
    if (response.ok) {
      localStorage.setItem("user", result.token);
      router.push("/dashboard");
    } else {
      setNotification({
        status: "error",
        message: result.message,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Head>
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
            onBlur={inputHandleChange}
            onChange={inputHandleChange}
            value={formData.email.value}
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
            onBlur={inputHandleChange}
            onChange={inputHandleChange}
            value={formData.password.value}
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
              formData.password.value.trim() === "" && (
                <p>Password required</p>
              ))}
          <Link href="/auth/forgotPassword" className={classes.forgot}>
            Forgot password ?
          </Link>
          <Button
            type="submit"
            loginFormValid={formData.loginFormValid}
            isClicked={isClicked}
          >
            {isClicked ? <LoadingSpinner /> : "Login"}
          </Button>
        </form>
        <AdditionalText additionalText="Create an account?" signup href="/" />
        {notification && (
          <Notification
            status={notification.status}
            message={notification.message}
          />
        )}
      </div>
    </>
  );
}
