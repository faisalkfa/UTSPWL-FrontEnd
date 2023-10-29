import React from "react";
import CreateProductForm from "./components/CreateProductForm";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/slices/products/slices";
import { Navbar } from "../../components";

const CreateProduct = () => {

    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("image", values.image);

        dispatch(createProduct(formData))

    };

    return (
        <main>
            <Navbar />
            <CreateProductForm onSubmit={handleSubmit} />
        </main>
    );
};

export default CreateProduct;
