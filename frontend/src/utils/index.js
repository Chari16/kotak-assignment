import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
});
