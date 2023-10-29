import * as Yup from "yup"
import YupPassword from 'yup-password';
YupPassword(Yup);

// @define register validation schema
export const registerValidationSchema = Yup.object({
  username : Yup.string().required(),
  password: Yup.string()
    .required("Password is required")
    .min(6, 'password must contain 6 or more characters with at least one of each: uppercase, special character')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minSymbols(1, 'password must contain at least 1 special character'),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
});

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Input is required"),
  password: Yup.string()
  .required("Password is required")
});