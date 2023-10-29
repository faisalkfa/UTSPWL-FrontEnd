import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartTotalPrice, deleteCart, fetchCart } from '../../store/slices/cart/slices';
import { Navbar } from '../../components';
import { formatRupiah } from '../../utils/Currency';
import { isFulfilled } from '@reduxjs/toolkit';
import { Button, Modal } from 'flowbite-react';
import { createTransaction } from '../../store/slices/transaction/slices';
import CartEditForm from './components/CartEditForm';

function Cart() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        cart, total
    } = useSelector((state) => {
        return {
            cart: state.carts?.carts,
            total: state.carts?.total
        };
    });
    
    useEffect(() => {

        dispatch(fetchCart())
        dispatch(cartTotalPrice())

    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCart(id)).then((response) => {
            if(isFulfilled(response)){
                console.log(response)
                navigate('/')
            }
        });
    };

    const handleCheckout = () => {
        dispatch(createTransaction()).then((res) => {
            if(isFulfilled(res)) {
                navigate('/')
            }
        });
    };

    const showEditForm = (product) => {
        setSelectedProduct(product);
        if(selectedProduct) {
            setOpenModal(true);
            console.log(selectedProduct)
        }
    }

    return (
        <main>
            <Navbar />
            <section className="h-screen bg-gray-100 px-4 text-gray-600 antialiased">
                <div className="flex h-full flex-col justify-center">
                    <div className="mx-auto w-full max-w-3xl">
                        <div className='rounded-sm border border-gray-200 bg-white shadow-lg'>
                            <header className="border-b border-gray-100 px-5 py-4">
                                <div className="font-semibold text-gray-800">My Carts</div>
                            </header>

                            <div className="overflow-x-auto p-3">
                                <table className="w-full table-auto">
                                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                        <tr>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Product Name</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Quantity</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Total</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="text-center font-semibold">Action</div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {cart && cart.map((item) => (
                                            <tr key={item.cart_id}>
                                                <td className="p-2">
                                                    <div className="font-medium text-gray-800">{item.product.name}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left">{item.quantity}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left font-medium text-green-500">{formatRupiah(item.quantity * item.product.price)}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex justify-center space-x-2">
                                                        <Button type='button' color='dark' onClick={() => showEditForm(item)}>
                                                            Edit
                                                        </Button>
                                                        <Button type='button' color='failure' onClick={() => handleDelete(item.cart_id)}>
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
                                <div>Total</div>
                                <div className="text-blue-600">
                                    <span>{total ? formatRupiah(total) : 0}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end mt-5'>
                            <Button type='button' color='warning' onClick={handleCheckout}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit Cart</Modal.Header>
                <Modal.Body>
                    <CartEditForm product={selectedProduct}/>
                </Modal.Body>
            </Modal>
        </main>
    );
}

export default Cart;
