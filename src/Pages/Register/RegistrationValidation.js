import * as yup from "yup";

// name/email schema
export const registrationValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "too short")
    .max(20, "too long")
    .required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().min(6, "minmum 6 characters").required("required"),
});