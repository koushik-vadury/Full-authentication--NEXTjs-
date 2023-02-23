import { createSlice, configureStore } from "@reduxjs/toolkit";

const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    name: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    email: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    password: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    cPassword: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    signUpFormValid: false,
    loginFormValid: false,
  },

  reducers: {
    setSignUpFormValid(state, action) {
      state.signUpFormValid = action.payload;
    },
    setLogInFormValid(state, action) {
      state.loginFormValid = action.payload;
    },
    setName(state, action) {
      state.name.value = action.payload;
    },
    nameTouched(state, action) {
      state.name.isTouched = action.payload;
    },
    nameIsValid(state, action) {
      state.name.isValid = action.payload;
    },

    setEmail(state, action) {
      state.email.value = action.payload;
    },
    emailTouched(state, action) {
      state.email.isTouched = action.payload;
    },
    emailIsValid(state, action) {
      state.email.isValid = action.payload;
    },

    setPassword(state, action) {
      state.password.value = action.payload;
    },
    passwordTouched(state, action) {
      state.password.isTouched = action.payload;
    },
    passwordIsValid(state, action) {
      state.password.isValid = action.payload;
    },

    setCpassword(state, action) {
      state.cPassword.value = action.payload;
    },
    cPasswordTouched(state, action) {
      state.cPassword.isTouched = action.payload;
    },
    cPasswordIsValid(state, action) {
      state.cPassword.isValid = action.payload;
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
const store = configureStore({
  reducer: { formData: formDataSlice.reducer, ui: uiSlice.reducer },
});

export const formDataActions = formDataSlice.actions;
export const uiActions = uiSlice.actions;

export default store;
