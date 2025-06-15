import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please use a valid mail address")
    .required("Email is required")
    .label("email"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
    .label("password"),
});

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please use a valid mail address")
    .required("Email is required")
    .label("email"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
    .label("password"),
  fullname: Yup.string()
    .required("fullname is required")
    .min(3)
    .label("fullname"),
  phone: Yup.string()
    .required("phone is required")
    .min(10)
    .label("phone"),
});

export const productValidationSchema = Yup.object().shape({
  platform: Yup.string().required("Platform is required").label("platform"),
  price: Yup.number().required("Price is required").label("price"),
  followers: Yup.number().required("Followers is required").label("followers"),
  following: Yup.number().required("Following is required").label("following"),
});
