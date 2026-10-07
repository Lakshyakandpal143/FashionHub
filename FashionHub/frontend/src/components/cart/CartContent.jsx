import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { cartKey, useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/pricing';

const CartContent = () => {
    const { items, updateQuantity, removeItem } = useCart();

    if (items.length === 0) {
        return <p className='text-gray-500'>Your cart is empty.</p>;
    }

    return (
        <div>
            {
                items.map((product) => {
                    const key = cartKey(product);
                    return (
                        <div key={key} className='flex items-start justify-between py-4 border-b'>
                            <div className='flex items-start'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                                <div>
                                    <h3>{product.name}</h3>
                                    <p className='text-sm text-gray-500'>size: {product.size} | color: {product.color}</p>
                                    <div className='flex items-center mt-2'>
                                        <button onClick={() => updateQuantity(key, product.quantity - 1)} disabled={product.quantity <= 1} className='border rounded px-2 py-1 text-xl font-medium disabled:opacity-40'>-</button>
                                        <span className='mx-4'>{product.quantity}</span>
                                        <button onClick={() => updateQuantity(key, product.quantity + 1)} disabled={product.quantity >= (product.stock || 99)} className='border rounded px-2 py-1 text-xl font-medium disabled:opacity-40'>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-end'>
                                <p>{formatPrice(product.price * product.quantity)}</p>
                                <button onClick={() => removeItem(key)} aria-label='Remove item'>
                                    <RiDeleteBin5Line className='h-6 w-6 mt-2 text-red-600' />
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default CartContent
