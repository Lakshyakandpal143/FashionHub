import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../api'
import useFetch from '../../hooks/useFetch'
import { formatPrice } from '../../utils/pricing'

const ProductManagement = () => {
    const { data: products, loading, error, refetch } = useFetch('/admin/products');

    const handleDelete = async (p) => {
        if (!window.confirm(`Delete "${p.name}"?`)) return;
        try {
            await api.del(`/products/${p._id}`);
            toast.success('Product deleted');
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>Product Management</h2>
                <Link to='/admin/products/new' className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'>Add Product</Link>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-600'>{error}</p>}
            {products && (
                <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                            <tr>
                                <th className='py-3 px-4'>Product</th>
                                <th className='py-3 px-4'>Price</th>
                                <th className='py-3 px-4'>Stock</th>
                                <th className='py-3 px-4'>Published</th>
                                <th className='py-3 px-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length ? products.map((p) => (
                                <tr key={p._id} className='border-b hover:bg-gray-50'>
                                    <td className='p-4'>
                                        <div className='flex items-center gap-3'>
                                            <img src={p.images?.[0]?.url} alt='' className='w-10 h-10 object-cover rounded' />
                                            <span className='font-medium text-gray-900'>{p.name}</span>
                                        </div>
                                    </td>
                                    <td className='p-4'>{formatPrice(p.price)}</td>
                                    <td className={`p-4 ${p.countInStock === 0 ? 'text-red-600 font-medium' : ''}`}>{p.countInStock}</td>
                                    <td className='p-4'>{p.isPublished ? 'Yes' : 'No'}</td>
                                    <td className='p-4 whitespace-nowrap'>
                                        <Link to={`/admin/products/${p._id}/edit`} className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'>Edit</Link>
                                        <button onClick={() => handleDelete(p)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className='p-4 text-center'>No products found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductManagement
