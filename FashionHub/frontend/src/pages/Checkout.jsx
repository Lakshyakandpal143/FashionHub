import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { cartKey, useCart } from '../context/CartContext'
import { formatPrice, shippingFor, FREE_SHIPPING_ABOVE } from '../utils/pricing'

const Checkout = () => {
    const { user } = useAuth();
    const { items, subtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [shipping, setShipping] = useState({
        fullName: user?.name || '', phone: '', address: '', city: '', postalCode: '', country: 'India',
    });

    const shippingFee = shippingFor(subtotal);
    const total = subtotal + shippingFee;
    const change = (field) => (e) => setShipping((s) => ({ ...s, [field]: e.target.value }));

    if (items.length === 0) {
        return (
            <div className='max-w-xl mx-auto py-20 text-center'>
                <h2 className='text-2xl font-semibold mb-4'>Your cart is empty</h2>
                <Link to='/collections/all' className='bg-black text-white px-6 py-2 rounded'>Continue shopping</Link>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const order = await api.post('/orders', {
                orderItems: items.map(({ productId, size, color, quantity }) => ({ productId, size, color, quantity })),
                shippingAddress: shipping,
                paymentMethod,
            });
            clearCart();
            navigate(`/order-confirmation/${order._id}`, { replace: true });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const input = 'w-full p-2 border rounded';
    const label = 'block text-gray-700 text-sm font-medium mb-1';

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6'>
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-lg mb-4'>Contact Details</h3>
                    <div className='mb-4'>
                        <label className={label}>Email</label>
                        <input type='email' value={user?.email || ''} className={`${input} bg-gray-100`} disabled />
                    </div>

                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className='mb-4'>
                        <label className={label}>Full name</label>
                        <input type='text' value={shipping.fullName} onChange={change('fullName')} className={input} required />
                    </div>
                    <div className='mb-4'>
                        <label className={label}>Address</label>
                        <input type='text' value={shipping.address} onChange={change('address')} className={input} required />
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className={label}>City</label>
                            <input type='text' value={shipping.city} onChange={change('city')} className={input} required />
                        </div>
                        <div>
                            <label className={label}>Postal code</label>
                            <input type='text' value={shipping.postalCode} onChange={change('postalCode')} className={input} required />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className={label}>Country</label>
                        <input type='text' value={shipping.country} onChange={change('country')} className={input} required />
                    </div>
                    <div className='mb-6'>
                        <label className={label}>Phone</label>
                        <input type='tel' value={shipping.phone} onChange={change('phone')} className={input} required />
                    </div>

                    <h3 className='text-lg mb-4'>Payment</h3>
                    <div className='mb-6 space-y-2'>
                        <label className='flex items-center gap-2 border rounded p-3 cursor-pointer'>
                            <input type='radio' name='payment' checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                            Cash on Delivery
                        </label>
                        <label className='flex items-center gap-2 border rounded p-3 cursor-pointer'>
                            <input type='radio' name='payment' checked={paymentMethod === 'Demo Online'} onChange={() => setPaymentMethod('Demo Online')} />
                            <span>Online payment <span className='text-xs text-gray-500'>(demo - no real charge)</span></span>
                        </label>
                    </div>

                    <button type='submit' disabled={submitting} className='w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 disabled:opacity-50'>
                        {submitting ? 'Placing order...' : `Place order · ${formatPrice(total)}`}
                    </button>
                </form>
            </div>

            <div className='bg-gray-50 rounded-lg p-6 self-start'>
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {items.map((p) => (
                        <div key={cartKey(p)} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items-start'>
                                <img src={p.image} alt={p.name} className='w-20 h-24 object-cover mr-4 rounded' />
                                <div>
                                    <h3 className='text-md'>{p.name}</h3>
                                    <p className='text-gray-500 text-sm'>Size: {p.size} | Color: {p.color}</p>
                                    <p className='text-gray-500 text-sm'>Qty: {p.quantity}</p>
                                </div>
                            </div>
                            <p className='text-lg'>{formatPrice(p.price * p.quantity)}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between text-lg mb-2'><p>Subtotal</p><p>{formatPrice(subtotal)}</p></div>
                <div className='flex justify-between text-lg'><p>Shipping</p><p>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</p></div>
                {shippingFee > 0 && <p className='text-xs text-gray-500 mt-1'>Free shipping on orders above {formatPrice(FREE_SHIPPING_ABOVE)}</p>}
                <div className='flex justify-between text-lg mt-4 border-t pt-4 font-semibold'><p>Total</p><p>{formatPrice(total)}</p></div>
            </div>
        </div>
    )
}

export default Checkout
