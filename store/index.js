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
    updateFormData: (state, action) => {
      const { field, value, isValid, isTouched } = action.payload;
      state[field] = { value, isValid, isTouched };
    },
    loginFormValid: (state, action) => {
      state.loginFormValid = action.payload;
    },
    signUpFormValid: (state, action) => {
      state.signUpFormValid = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { formData: formDataSlice.reducer },
});

export const formDataActions = formDataSlice.actions;

export default store;
