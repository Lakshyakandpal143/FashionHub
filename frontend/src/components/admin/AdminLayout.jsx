import React, { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const LINKS = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/users', label: 'Users' },
];

const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const linkClass = ({ isActive }) =>
        `block py-3 px-4 rounded ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

    return (
        <div className='min-h-screen flex flex-col md:flex-row relative'>
            <div className='flex md:hidden p-4 bg-gray-900 text-white z-20 items-center'>
                <button onClick={() => setOpen(!open)} aria-label='Toggle menu'><FaBars size={24} /></button>
                <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
            </div>
            {open && <div className='fixed inset-0 z-10 bg-black/50 md:hidden' onClick={() => setOpen(false)} />}

            <aside className={`bg-gray-900 text-white w-64 min-h-screen p-6 fixed md:static z-20 transform transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <Link to='/admin' className='block text-2xl font-medium mb-6'>FashionHub</Link>
                <h2 className='text-xl font-medium mb-6 text-center hidden md:block'>Admin Dashboard</h2>
                <nav className='flex flex-col space-y-2'>
                    {LINKS.map((l) => (
                        <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={linkClass}>{l.label}</NavLink>
                    ))}
                    <Link to='/' className='block py-3 px-4 rounded text-gray-300 hover:bg-gray-700 hover:text-white mt-6'>← Back to Shop</Link>
                </nav>
            </aside>

            <main className='flex-grow p-6 overflow-auto'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
