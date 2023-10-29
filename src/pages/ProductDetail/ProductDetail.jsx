import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailProduct } from '../../store/slices/products/slices';
import { isFulfilled } from '@reduxjs/toolkit';
import { TextInput } from 'flowbite-react';
import { addCart } from '../../store/slices/cart/slices'
import { formatRupiah } from '../../utils/Currency';
import { Navbar } from '../../components';

function ProductDetail() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { products } = useSelector((state) => {
    return {
      products: state.products.products[0]?.product
    }
  })

  useEffect(() => {
    const productDetailsRequest = {
      product_id: id,
    };

    dispatch(detailProduct(productDetailsRequest))

  }, [dispatch, id]);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token')

    if(!token) {
      navigate('/auth/login')
    }
    const productData = {
      product_id: product.id,
      quantity: parseInt(qty)
    }
    dispatch(addCart(productData)).then((response) => {
      if(isFulfilled(response)){
        navigate('/')
      }
      else{
        console.log(response);
      }
    });
  };


  return products ? (
    <main className='bg-gray-100'>
      <Navbar />
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={`data:image/jpeg;base64,${products.image}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {products.name}
              </h1>
              <p className="leading-relaxed">
                {products.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Quantity</span>
                  <div className="relative">
                    <TextInput type='number' max={products.stock} min={1} value={qty} onChange={(e) => setQty(e.target.value)}></TextInput>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{products.price ? formatRupiah(products.price) : 0}</span>
                <button onClick={() => handleAddToCart(products)} className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  ) : null;
}

export default ProductDetail;
