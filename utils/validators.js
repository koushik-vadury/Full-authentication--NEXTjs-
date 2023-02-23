export const validateLoginForm = (email, password) => {
  const isMailValid = validateMail(email);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = (email, username, password, cPassword) => {
  const isMailValid = validateMail(email);
  const isPasswordValid = validatePassword(password);
  const isCPasswordValid = validatePassword(cPassword);
  const isusernamevalid = validateUsername(username);

  return isMailValid && isPasswordValid && isusernamevalid && isCPasswordValid;
};
export const validateUsername = (username) => {
  return username.trim().length > 3 && username.trim().length < 21;
};
export const validatePassword = (password) => {
  return password.trim().length > 6 && password.trim().length < 15;
};

export const validateMail = (email) => {
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return emailPattern.test(email);
};
