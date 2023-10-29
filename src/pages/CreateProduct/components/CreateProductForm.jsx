import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateProductForm = ({ onSubmit }) => {
  return (
    <div className="max-w-xl">
      <h2>Create a New Product</h2>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          stock: "",
          image: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Product name is required"),
          description: Yup.string().required("Description is required"),
          price: Yup.number().required("Price is required"),
          stock: Yup.number().required("Stock is required"),
          image: Yup.mixed().required("Image is required"),
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="name">Product Name</label>
            <Field type="text" id="name" name="name" placeholder="Product Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field type="number" id="price" name="price" placeholder="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            <ErrorMessage name="price" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="stock">Stock</label>
            <Field type="number" id="stock" name="stock" placeholder="Stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            <ErrorMessage name="stock" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <Field type="file" id="image" name="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"/>
            <ErrorMessage name="image" component="div" className="error" />
          </div>

          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Save</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProductForm;
