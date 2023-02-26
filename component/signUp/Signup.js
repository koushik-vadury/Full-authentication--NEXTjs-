import classes from "./signup.module.css";
import Input from "../../component/UI/Input";
import AdditionalText from "../../component/UI/AdditionalText";
import Button from "../../component/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formDataActions } from "../../store/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  validateMail,
  validatePassword,
  validateUsername,
} from "../../utils/validators";
import LoadingSpinner from "../../component/UI/LoadingSpinner";
import Notification from "../UI/Notification";

export default function Signup() {
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClicked, setIsClicked] = useState();
  const [notification, setNotification] = useState(null);

  let nameIsValid = formData.name.isValid;
  let emailIsValid = formData.email.isValid;
  let passwordIsValid = formData.password.isValid;
  let cPasswordIsValid = formData.cPassword.isValid;
  let passwordValue = formData.password.value;
  let cPasswordValue = formData.cPassword.value;

  useEffect(() => {
    dispatch(
      formDataActions.signUpFormValid(
        nameIsValid &&
          emailIsValid &&
          passwordIsValid &&
          cPasswordIsValid &&
          passwordValue === cPasswordValue
      )
    );
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [
    dispatch,
    nameIsValid,
    emailIsValid,
    passwordIsValid,
    cPasswordIsValid,
    passwordValue,
    cPasswordValue,
    notification,
  ]);

  const inputHandleChange = (event) => {
    const { id, value } = event.target;
    let isValid;
    if (id === "email") {
      isValid = validateMail(event.target.value);
    } else if (id === "password" || id === "cPassword") {
      isValid = validatePassword(event.target.value);
    } else if (id === "name") {
      isValid = validateUsername(event.target.value);
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

  const signupFormHandler = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name.value,
        email: formData.email.value,
        password: formData.password.value,
        cPassword: formData.cPassword.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    setIsClicked(false);

    if (response.ok) {
      router.push("/auth/login");
      localStorage.setItem("user", result.token);
    } else {
      setNotification({
        status: "error",
        message: result.message,
      });
    }
  };

  return (
    <>
      <div className={classes.container}>
        <h2>Signup Required</h2>
        <hr />
        <form className={classes.formInput} onSubmit={signupFormHandler}>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            label="Your name"
            required
            onBlur={inputHandleChange}
            onChange={inputHandleChange}
            value={formData.name.value}
            validity={(
              !formData.name.isValid && formData.name.isTouched
            ).toString()}
          />
          {(!formData.name.isValid &&
            formData.name.isTouched &&
            formData.name.value.trim() !== "" && (
              <p>Username must be min 4 char. & max 20 char.</p>
            )) ||
            (formData.name.isTouched && formData.name.value.trim() === "" && (
              <p>Username required</p>
            ))}
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
            <p>Enter a valid email</p>
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

          <Input
            id="cPassword"
            type="password"
            placeholder="Confirm Password"
            label="confirm password"
            required
            onBlur={inputHandleChange}
            onChange={inputHandleChange}
            value={formData.cPassword.value}
            validity={(
              !formData.cPassword.isValid && formData.cPassword.isTouched
            ).toString()}
          />
          {(!formData.cPassword.isValid &&
            formData.cPassword.isTouched &&
            formData.cPassword.value.trim() !== "" && (
              <p>confirm password must be min 7 char. & max 14 char.</p>
            )) ||
            (formData.cPassword.isTouched &&
              formData.cPassword.value.trim() === "" && (
                <p> Confirm password required</p>
              )) ||
            (formData.password.value !== formData.cPassword.value &&
              formData.cPassword.isTouched && (
                <p>Password & confirm password are not same</p>
              ))}
          <Button
            type="submit"
            signUpFormValid={formData.signUpFormValid}
            isClicked={isClicked}
          >
            {isClicked ? <LoadingSpinner /> : "Signup"}
          </Button>
        </form>

        <AdditionalText
          additionalText="Already have an account?"
          login
          href="/auth/login"
        />

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
