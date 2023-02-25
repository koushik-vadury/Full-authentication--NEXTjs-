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
  validatePasswordAndCPassword,
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
    const passAndCpassword = validatePasswordAndCPassword(
      passwordValue,
      cPasswordValue
    );
    dispatch(
      formDataActions.setSignUpFormValid(signUpFormIsValid && passAndCpassword)
    );
  }, [emailValue, passwordValue, nameValue, cPasswordValue, dispatch]);
  console.table(formData);
  const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      cPassword: cPasswordValue,
    });
    // await fetch("/api/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: nameValue,
    //     email: emailValue,
    //     password: passwordValue,
    //     cPassword: cPasswordValue,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => console.log(response))
    //   .catch((err) => err.message);
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
