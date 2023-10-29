import { Button } from "flowbite-react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { editProduct } from "../../../store/slices/products/slices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";

function ProductEditForm(product) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                id: product.product.id,
                name: product.product.name,
                description: product.product.description,
                price: product.product.price,
                stock: product.product.stock,
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

                // Add more validation rules for other fields

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                // Dispatch an action to update the product in the Redux store
                dispatch(editProduct(values))
                .then((res) => {
                console.log("res: ",res)
                if(isFulfilled(res)) {
                    navigate('/')
                }
                else{
                    console.log(res.payload);  
                }
                })
                .catch((err) => {
                console.log(err);
                })
                setSubmitting(false);
            }}
        >
            <Form>
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" placeholder={product.product.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <ErrorMessage name="name" component="div" className="text-red-500 italice text-xs" />
                </div>

                <div className="mb-4">
                    <label htmlFor="description">Description</label>
                    <Field type="text" id="description" name="description" placeholder={product.product.description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <ErrorMessage name="description" component="div" className="text-red-500 italice text-xs" />
                </div>

                <div className="mb-4">
                    <label htmlFor="price">Price</label>
                    <Field type="number" id="price" name="price" placeholder={product.product.price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <ErrorMessage name="price" component="div" className="text-red-500 italice text-xs" />
                </div>

                <div className="mb-4">
                    <label htmlFor="stock">Stock</label>
                    <Field type="number" id="stock" name="stock" placeholder={product.product.stock} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <ErrorMessage name="stock" component="div" className="text-red-500 italice text-xs" />
                </div>

                {/* Add fields for other product details here */}

                <Button color="blue" type="submit">Save</Button>
            </Form>
        </Formik>
    );
}

export default ProductEditForm;