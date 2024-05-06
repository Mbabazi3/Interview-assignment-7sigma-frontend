import * as Yup from "yup";
export const loginValidation = Yup.object({
  username: Yup.string()
    .max(10, "Password is too long- should be 10 chars maximum")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum")
    .required("Password is required"),
});
