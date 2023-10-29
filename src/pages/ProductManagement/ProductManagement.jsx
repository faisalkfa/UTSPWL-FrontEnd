import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components';
import { formatRupiah } from '../../utils/Currency';
import { isFulfilled } from '@reduxjs/toolkit';
import { Button, Modal } from 'flowbite-react';
import { fetchTransaction } from '../../store/slices/transaction/slices';
import { convertToDate } from '../../utils/Date';
import transaction from '../../store/slices/transaction';
import { deleteProduct, fetchProducts } from '../../store/slices/products/slices';
import ProductEditForm from './components/ProductEditForm';
import ProductInsertForm from './components/ProductInsertForm';

function ProductManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        products,
    } = useSelector((state) => {
        return {
            products: state.products?.products,
        };
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const showEditForm = (product) => {
        setSelectedProduct(product);
        if(selectedProduct) {
            setOpenModal(true);
            console.log(selectedProduct)
        }
    }

    const showInsertForm = () => {
        setOpenModalAdd(true);
    }

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        console.log(id)
    };

    return (
        <main>
            <Navbar />
            <section className="h-screen bg-gray-100 px-4 text-gray-600 antialiased">
                <div className="flex h-full flex-col justify-center">
                    <div className="mx-auto w-full max-w-6xl">
                        <div className='rounded-sm border border-gray-200 bg-white shadow-lg'>
                            <header className="border-b flex justify-between border-gray-100 px-5 py-4">
                                <div className="font-semibold text-gray-800">Products</div>
                                <Button color='blue' type='button' onClick={() => showInsertForm()}>Add Product</Button>
                            </header>

                            <div className="overflow-x-auto p-3">
                                <table className="w-full table-auto">
                                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                        <tr>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">
                                                    Image
                                                </div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Name</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Description</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Stock</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Price</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Created Date</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-center font-semibold">Action</div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {products && products.map((item) => (
                                            <tr key={item.id}>
                                                <td className="p-2">
                                                    <div className="">
                                                        <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} className='w-[50px] h-[50px]' />
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left font-medium capitalize">{item.name}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left font-medium capitalize line-clamp-1">{item.description}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left font-medium capitalize">{item.stock}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left font-medium text-green-500 whitespace-nowrap">{formatRupiah(item.price)}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="font-medium text-gray-800 whitespace-nowrap">{convertToDate(item.created_at)}</div>
                                                </td>
                                                <td className="p-2 flex justify-center space-x-2">
                                                    <Button type='button' color={"warning"} onClick={() => showEditForm(item)}>Edit</Button>
                                                    <Button type='button' color={"failure"} onClick={() => handleDelete(item.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Product Edit</Modal.Header>
                <Modal.Body>
                    <ProductEditForm product={selectedProduct}/>
                </Modal.Body>
            </Modal>

            <Modal show={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Body>
                    <ProductInsertForm />
                </Modal.Body>
            </Modal>
        </main>
    );
}

export default ProductManagement;

