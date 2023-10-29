import { Button } from "flowbite-react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { createProduct, editProduct } from "../../../store/slices/products/slices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";

function ProductInsertForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                id: "",
                name: "",
                description: "",
                price: "",
                stock: "",
                image: null
            }}
            validate={(values) => {
                const errors = {};

                // Add validation logic for each field
                if (!values.name) {
                    errors.name = 'Required';
                }
                if (!values.price) {
                    errors.name = 'Required';
                }
                if (!values.description) {
                    errors.name = 'Required';
                }
                if (!values.stock) {
                    errors.name = 'Required';
                }
                if (!values.image) {
                    errors.name = 'Required';
                }


                // Add more validation rules for other fields

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();

                // Append form fields to the FormData object
                formData.append("name", values.name);
                formData.append("description", values.description);
                formData.append("price", values.price);
                formData.append("stock", values.stock);
                formData.append("image", values.image);

                dispatch(createProduct(formData))
                    .then((res) => {
                        console.log("res: ", res)
                        if (isFulfilled(res)) {
                            navigate('/')
                        }
                        else {
                            console.log(res.payload);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                setSubmitting(false);
            }}
        >
            {({
                setFieldValue,
            }) => (
                <Form>
                    <div className="mb-4">
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <ErrorMessage name="name" component="div" className="text-red-500 italice text-xs" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description">Description</label>
                        <Field type="text" id="description" name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <ErrorMessage name="description" component="div" className="text-red-500 italice text-xs" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price">Price</label>
                        <Field type="number" id="price" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <ErrorMessage name="price" component="div" className="text-red-500 italice text-xs" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stock">Stock</label>
                        <Field type="number" id="stock" name="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <ErrorMessage name="stock" component="div" className="text-red-500 italice text-xs" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" name="image" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" />
                        <ErrorMessage name="image" component="div" className="text-red-500 italice text-xs" />
                    </div>

                    <Button color="blue" type="submit">Save</Button>
                </Form>
            )}
        </Formik>
    );
}

export default ProductInsertForm;