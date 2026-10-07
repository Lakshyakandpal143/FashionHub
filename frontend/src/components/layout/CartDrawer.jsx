import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import CartContent from '../cart/CartContent';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/pricing';

const CartDrawer = () => {
    const { cartOpen, setCartOpen, items, subtotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const close = () => setCartOpen(false);
    const handleCheckout = () => {
        close();
        navigate(user ? '/checkout' : '/login?redirect=/checkout');
    };

    return (
        <>
            {cartOpen && <div className='fixed inset-0 bg-black/30 z-40' onClick={close} />}
            <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={close}>
                        <IoMdClose className='h-6 w-6 text-gray-600 hover:text-[#C1444F]' />
                    </button>
                </div>
                <div className='flex-grow p-4 overflow-y-auto'>
                    <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                    <CartContent />
                </div>
                {items.length > 0 && (
                    <div className='p-4 bg-white sticky bottom-0 border-t'>
                        <div className='flex justify-between font-semibold mb-3'>
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
                            Checkout
                        </button>
                        <p className='text-xs tracking-tighter text-gray-500 mt-2 text-center'>Shipping, taxes and discount codes calculated at checkout.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartDrawer
