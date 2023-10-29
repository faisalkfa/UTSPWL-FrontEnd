import { Button } from "flowbite-react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";
import { editCart } from "../../../store/slices/cart/slices";

function CartEditForm(product) {
    console.log(product)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                id: product.product.cart_id,
                quantity: product.product.quantity
            }}
            validate={(values) => {
                const errors = {};

                if (!values.quantity) {
                    errors.quantity = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(editCart(values))
                .then((res) => {
                console.log("res: ",res)
                if(isFulfilled(res)) {
                    navigate('/')
                }
                else{
                    console.log(res);  
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
                    <label htmlFor="quantity">Quantity</label>
                    <Field type="number" id="quantity" name="quantity" placeholder={product.product.quantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <ErrorMessage name="quantity" component="div" className="text-red-500 italice text-xs" />
                </div>

                {/* Add fields for other product details here */}

                <Button color="blue" type="submit">Save</Button>
            </Form>
        </Formik>
    );
}

export default CartEditForm;