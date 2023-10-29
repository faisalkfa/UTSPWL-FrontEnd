// src/components/Product.tsx

import React from "react";

import { formatRupiah } from "../../../utils/Currency";

const Product = ({ id, name, price, image }) => {
    const imageUrl = `data:image/jpeg;base64,${image}`;
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href={`/product/detail/${id}`} className="w-full overflow-hidden bg-gray-100">
                <img className="object-cover h-48 w-96 rounded-t-lg mx-auto" src={imageUrl} alt="" />
            </a>
            <div className="p-5">
            <a href={`/product/detail/${id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">{price ? formatRupiah(price) : 0}</p>
                <a href={`/product/detail/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-400">
                    Detail
                </a>
            </div>
        </div>
    );
};

export default Product;
