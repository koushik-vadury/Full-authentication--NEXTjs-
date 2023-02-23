import classes from "./index.module.css";
import Input from "../component/UI/Input";
import AdditionalText from "../component/UI/AdditionalText";
import Button from "../component/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { formDataActions } from "../store/index";
import { useEffect } from "react";
import {
  validateMail,
  validatePassword,
  validateRegisterForm,
  validateUsername,
} from "../utils/validators";

export default function Home() {
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();

  let nameValue = formData.name.value;
  let emailValue = formData.email.value;
  let passwordValue = formData.password.value;
  let cPasswordValue = formData.cPassword.value;

  useEffect(() => {
    const isValidName = validateUsername(nameValue);
    const isValidMail = validateMail(emailValue);
    const isValidPassword = validatePassword(passwordValue);
    const isValidCPassword = validatePassword(cPasswordValue);

    dispatch(formDataActions.emailIsValid(isValidMail));
    dispatch(formDataActions.passwordIsValid(isValidPassword));
    dispatch(formDataActions.nameIsValid(isValidName));
    dispatch(formDataActions.cPasswordIsValid(isValidCPassword));

    const signUpFormIsValid = validateRegisterForm(
      emailValue,
      nameValue,
      passwordValue,
      cPasswordValue
    );

    dispatch(formDataActions.setSignUpFormValid(signUpFormIsValid));
  }, [emailValue, passwordValue, nameValue, cPasswordValue]);

  const signupFormHandler = async (event) => {
    event.preventDefault();
    await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        cPassword: cPasswordValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .catch((err) => err.message);
    // console.log(response);
    // const result = await response.json();
    // console.log(result);
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
            onBlur={() => dispatch(formDataActions.nameTouched(true))}
            onChange={(event) =>
              dispatch(formDataActions.setName(event.target.value))
            }
            value={formData.name.value}
            validity={(
              !formData.name.isValid && formData.name.isTouched
            ).toString()}
          />
          {!formData.name.isValid && formData.name.isTouched && (
            <p>Username must be min 4 char. & max 20 char.</p>
          )}
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            label="your email"
            required
            onBlur={() => dispatch(formDataActions.emailTouched(true))}
            onChange={(event) =>
              dispatch(formDataActions.setEmail(event.target.value))
            }
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
            onBlur={() => dispatch(formDataActions.passwordTouched(true))}
            onChange={(event) =>
              dispatch(formDataActions.setPassword(event.target.value))
            }
            value={formData.password.value}
            validity={(
              !formData.password.isValid && formData.password.isTouched
            ).toString()}
          />
          {!formData.password.isValid && formData.password.isTouched && (
            <p>Password must be min 7 char. & max 14 char.</p>
          )}
          <Input
            id="cpassword"
            type="password"
            placeholder="Confirm Password"
            label="confirm password"
            required
            onBlur={() => dispatch(formDataActions.cPasswordTouched(true))}
            onChange={(event) =>
              dispatch(formDataActions.setCpassword(event.target.value))
            }
            value={formData.cPassword.value}
            validity={(
              !formData.cPassword.isValid && formData.cPassword.isTouched
            ).toString()}
          />
          {!formData.cPassword.isValid && formData.cPassword.isTouched && (
            <p>Password must be min 7 char. & max 14 char.</p>
          )}
          <Button type="submit" signUpFormValid={formData.signUpFormValid}>
            Signup
          </Button>
        </form>
        <AdditionalText
          additionalText="Already have an account?"
          login
          href="/auth/login"
        />
      </div>
    </>
  );
}
