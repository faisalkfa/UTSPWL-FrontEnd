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

function History() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        transactions,
    } = useSelector((state) => {
        return {
            transactions: state.transactions?.transactions,
        };
    });

    useEffect(() => {
        dispatch(fetchTransaction());
    }, [dispatch]);

    const showDetail = (transaction) => {
        setSelectedTransaction(transaction);
        if(selectedTransaction) {
            setOpenModal(true);
            console.log(selectedTransaction)
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
                                <div className="font-semibold text-gray-800">Transactions History</div>
                            </header>

                            <div className="overflow-x-auto p-3">
                                <table className="w-full table-auto">
                                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                        <tr>
                                            <th className="p-2">
                                                <div className="text-left font-semibold">Date</div>
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
                                        {transactions && transactions.map((item) => (
                                            <tr key={item.id}>
                                                <td className="p-2">
                                                    <div className="font-medium text-gray-800">{convertToDate(item.created_at)}</div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="text-left font-medium text-green-500">{formatRupiah(item.total)}</div>
                                                </td>
                                                <td className="p-2 flex justify-center">
                                                    <Button type='button' color={"dark"} onClick={() => showDetail(item)}>Detail</Button>
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
                <Modal.Header>Transaction Detail</Modal.Header>
                <Modal.Body>
                    <div className="overflow-x-auto p-3">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                                <tr>
                                    <th className="p-2">
                                        <div className="text-left font-semibold">Date</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="text-left font-semibold">Quantity</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="text-left font-semibold">Total</div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 text-sm">
                                {selectedTransaction != null && selectedTransaction?.details.map((item) => (
                                    <tr key={item.id}>
                                        <td className="p-2">
                                            <div className="font-medium text-gray-800">{item.product.name}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left">{item.quantity}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-left font-medium text-green-500">{formatRupiah(item.quantity * item.product.price)}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color='dark' onClick={() => setOpenModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}

export default History;

