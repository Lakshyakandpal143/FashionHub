import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import StatusBadge from '../../components/orders/StatusBadge'
import { formatPrice } from '../../utils/pricing'

const Card = ({ title, value, to }) => (
    <div className='p-4 shadow-md rounded-lg bg-white'>
        <h2 className='text-gray-500'>{title}</h2>
        <p className='text-2xl font-bold'>{value}</p>
        {to && <Link to={to} className='text-blue-500 hover:underline text-sm'>Manage</Link>}
    </div>
);

const AdminHomePage = () => {
    const { data: stats, loading, error } = useFetch('/admin/stats');

    if (loading) return <p>Loading...</p>;
    if (error) return <p className='text-red-600'>{error}</p>;

    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <Card title='Revenue' value={formatPrice(stats.revenue)} />
                <Card title='Total Orders' value={stats.orders} to='/admin/orders' />
                <Card title='Total Products' value={stats.products} to='/admin/products' />
                <Card title='Total Users' value={stats.users} to='/admin/users' />
            </div>
            <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500 bg-white shadow-md rounded-lg overflow-hidden'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Order ID</th>
                            <th className='py-3 px-4'>Customer</th>
                            <th className='py-3 px-4'>Total</th>
                            <th className='py-3 px-4'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.recentOrders.length ? stats.recentOrders.map((o) => (
                            <tr key={o._id} className='border-b'>
                                <td className='p-4'><Link to={`/order/${o._id}`} className='text-blue-600 hover:underline'>#{o._id.slice(-8).toUpperCase()}</Link></td>
                                <td className='p-4'>{o.user?.name || 'Deleted user'}</td>
                                <td className='p-4'>{formatPrice(o.totalPrice)}</td>
                                <td className='p-4'><StatusBadge label={o.status} /></td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className='p-4 text-center'>No orders yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminHomePage
