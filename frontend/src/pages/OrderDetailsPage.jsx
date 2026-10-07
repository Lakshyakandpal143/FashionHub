import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import StatusBadge from '../components/orders/StatusBadge'
import { formatPrice } from '../utils/pricing'

// Used for both /order/:id and /order-confirmation/:id
const OrderDetailsPage = ({ confirmation = false }) => {
    const { id } = useParams();
    const { data: order, loading, error } = useFetch(`/orders/${id}`);

    if (loading) return <div className='p-10 text-center text-gray-500'>Loading order...</div>;
    if (error || !order) return <div className='p-10 text-center text-red-600'>{error || 'Order not found'}</div>;

    const placed = new Date(order.createdAt);
    const eta = new Date(placed.getTime() + 5 * 24 * 60 * 60 * 1000);
    const a = order.shippingAddress;

    return (
        <div className='max-w-4xl mx-auto p-6'>
            {confirmation && (
                <h1 className='text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-8'>Thank you for your order!</h1>
            )}
            <div className='p-6 rounded-lg border'>
                <div className='flex flex-wrap justify-between gap-4 mb-8'>
                    <div>
                        <h2 className='text-xl font-semibold'>Order #{order._id.slice(-8).toUpperCase()}</h2>
                        <p className='text-gray-500'>Placed on {placed.toLocaleDateString()}</p>
                    </div>
                    <div className='text-sm'>
                        {order.status !== 'Cancelled' && !order.isDelivered && (
                            <p className='text-emerald-700 mb-2'>Estimated delivery: {eta.toLocaleDateString()}</p>
                        )}
                        <div className='flex gap-2'>
                            <StatusBadge label={order.isPaid ? 'Paid' : 'Pending'} />
                            <StatusBadge label={order.status} />
                        </div>
                    </div>
                </div>

                <div className='mb-8'>
                    {order.orderItems.map((item, i) => (
                        <div key={i} className='flex items-center mb-4'>
                            <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                            <div className='flex-grow'>
                                <Link to={`/product/${item.productId}`} className='text-md font-semibold hover:underline'>{item.name}</Link>
                                <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
                            </div>
                            <div className='text-right'>
                                <p>{formatPrice(item.price)}</p>
                                <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                        <p className='text-gray-600'>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online payment (demo)'}</p>
                        <h4 className='text-lg font-semibold mt-4 mb-2'>Delivery address</h4>
                        <p className='text-gray-600'>{a.fullName}</p>
                        <p className='text-gray-600'>{a.address}</p>
                        <p className='text-gray-600'>{a.city}, {a.postalCode}, {a.country}</p>
                        <p className='text-gray-600'>{a.phone}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Summary</h4>
                        <div className='flex justify-between text-gray-600'><span>Items</span><span>{formatPrice(order.itemsPrice)}</span></div>
                        <div className='flex justify-between text-gray-600'><span>Shipping</span><span>{order.shippingPrice ? formatPrice(order.shippingPrice) : 'Free'}</span></div>
                        <div className='flex justify-between font-semibold border-t mt-2 pt-2'><span>Total</span><span>{formatPrice(order.totalPrice)}</span></div>
                    </div>
                </div>
            </div>
            <div className='mt-6 text-center'>
                <Link to={confirmation ? '/collections/all' : '/profile'} className='text-blue-600 underline'>
                    {confirmation ? 'Continue shopping' : 'Back to my orders'}
                </Link>
            </div>
        </div>
    )
}

export default OrderDetailsPage
