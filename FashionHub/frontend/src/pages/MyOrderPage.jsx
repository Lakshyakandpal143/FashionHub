import React from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import StatusBadge from '../components/orders/StatusBadge'
import { formatPrice } from '../utils/pricing'

const MyOrderPage = () => {
    const { data: orders, loading, error } = useFetch('/orders/my-orders');
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-sm uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order Id</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Payment</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} className='py-4 px-4 text-center text-gray-500'>Loading orders...</td></tr>
                        ) : error ? (
                            <tr><td colSpan={8} className='py-4 px-4 text-center text-red-600'>{error}</td></tr>
                        ) : orders?.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} onClick={() => navigate(`/order/${order._id}`)} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='py-2 px-4'>
                                        <img src={order.orderItems[0]?.image} alt={order.orderItems[0]?.name} className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg' />
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id.slice(-8).toUpperCase()}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4 whitespace-nowrap'>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.orderItems.length} item(s)</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>{formatPrice(order.totalPrice)}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'><StatusBadge label={order.isPaid ? 'Paid' : 'Pending'} /></td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'><StatusBadge label={order.status} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={8} className='py-4 px-4 text-center text-gray-500'>You have no orders</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrderPage
