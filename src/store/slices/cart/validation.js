import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(0.01, "Price must be at least 0.01"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock must be a non-negative integer"),
});
