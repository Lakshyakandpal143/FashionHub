import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../api'
import useFetch from '../../hooks/useFetch'
import StatusBadge from '../../components/orders/StatusBadge'
import { formatPrice } from '../../utils/pricing'

const STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

const OrderManagement = () => {
    const { data: orders, loading, error, refetch } = useFetch('/admin/orders');

    const changeStatus = async (order, status) => {
        if (status === 'Cancelled' && !window.confirm('Cancel this order? Stock will be returned.')) return;
        try {
            await api.put(`/admin/orders/${order._id}`, { status });
            toast.success('Order updated');
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-600'>{error}</p>}
            {orders && (
                <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                            <tr>
                                <th className='py-3 px-4'>Order</th>
                                <th className='py-3 px-4'>Customer</th>
                                <th className='py-3 px-4'>Date</th>
                                <th className='py-3 px-4'>Total</th>
                                <th className='py-3 px-4'>Payment</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length ? orders.map((o) => (
                                <tr key={o._id} className='border-b hover:bg-gray-50'>
                                    <td className='p-4'><Link to={`/order/${o._id}`} className='text-blue-600 hover:underline'>#{o._id.slice(-8).toUpperCase()}</Link></td>
                                    <td className='p-4'>{o.user?.name || 'Deleted user'}</td>
                                    <td className='p-4 whitespace-nowrap'>{new Date(o.createdAt).toLocaleDateString()}</td>
                                    <td className='p-4'>{formatPrice(o.totalPrice)}</td>
                                    <td className='p-4'><StatusBadge label={o.isPaid ? 'Paid' : 'Pending'} /></td>
                                    <td className='p-4'>
                                        {o.status === 'Cancelled' ? (
                                            <StatusBadge label='Cancelled' />
                                        ) : (
                                            <select value={o.status} onChange={(e) => changeStatus(o, e.target.value)} className='border rounded p-1 text-sm text-gray-900'>
                                                {STATUSES.map((s) => <option key={s}>{s}</option>)}
                                            </select>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={6} className='p-4 text-center'>No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default OrderManagement
