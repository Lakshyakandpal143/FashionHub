import React from 'react'
import { toast } from 'sonner'
import { api } from '../../api'
import useFetch from '../../hooks/useFetch'
import { useAuth } from '../../context/AuthContext'

const UserManagement = () => {
    const { user: me } = useAuth();
    const { data: users, loading, error, refetch } = useFetch('/admin/users');

    const changeRole = async (u, role) => {
        try {
            await api.put(`/admin/users/${u._id}`, { role });
            toast.success('Role updated');
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const remove = async (u) => {
        if (!window.confirm(`Delete user ${u.email}?`)) return;
        try {
            await api.del(`/admin/users/${u._id}`);
            toast.success('User deleted');
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>User Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-600'>{error}</p>}
            {users && (
                <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                            <tr>
                                <th className='py-3 px-4'>Name</th>
                                <th className='py-3 px-4'>Email</th>
                                <th className='py-3 px-4'>Role</th>
                                <th className='py-3 px-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className='border-b hover:bg-gray-50'>
                                    <td className='p-4 font-medium text-gray-900'>{u.name}</td>
                                    <td className='p-4'>{u.email}</td>
                                    <td className='p-4'>
                                        <select value={u.role} disabled={u._id === me._id} onChange={(e) => changeRole(u, e.target.value)} className='border rounded p-1 disabled:opacity-60'>
                                            <option value='customer'>Customer</option>
                                            <option value='admin'>Admin</option>
                                        </select>
                                    </td>
                                    <td className='p-4'>
                                        <button disabled={u._id === me._id} onClick={() => remove(u)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-40'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UserManagement
