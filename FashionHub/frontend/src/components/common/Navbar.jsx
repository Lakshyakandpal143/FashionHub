import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2'
import Search from './Search'
import CartDrawer from '../layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
    { label: 'Men', to: '/collections/all?gender=Men' },
    { label: 'Women', to: '/collections/all?gender=Women' },
    { label: 'Top wear', to: '/collections/all?category=Top%20Wear' },
    { label: 'Bottom wear', to: '/collections/all?category=Bottom%20Wear' },
];

const Navbar = () => {
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { count, setCartOpen } = useCart();
    const { user } = useAuth();
    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-5'>
                <div>
                    <Link to='/' className='text-2xl font-medium'>FashionHub</Link>
                </div>
                <div className='hidden md:flex space-x-6'>
                    {NAV_LINKS.map((l) => (
                        <Link key={l.label} to={l.to} className='text-[#222222] hover:text-[#C1444F] text-sm font-medium uppercase'>{l.label}</Link>
                    ))}
                </div>
                <div className='flex items-center space-x-4'>
                    {user?.role === 'admin' && (
                        <Link to='/admin' className='block bg-black px-2 py-1 rounded text-sm text-white'>Admin</Link>
                    )}
                    <Link to={user ? '/profile' : '/login'} className='hover:text-[#C1444F]'>
                        <HiOutlineUser className='h-6 w-6 text-[#222222] hover:text-[#C1444F]' />
                    </Link>
                    <button onClick={() => setCartOpen(true)} className='relative hover:text-[#C1444F]'>
                        <HiOutlineShoppingBag className='h-6 w-6 text-[#222222] hover:text-[#C1444F]' />
                        {count > 0 && (
                            <span className='absolute -top-1 -right-3 bg-[#2E0039] text-[#F5F5F5] text-xs rounded-full px-2 py-0.5'>{count}</span>
                        )}
                    </button>
                    <div className='overflow-hidden'>
                        <Search />
                    </div>

                    <button onClick={toggleNavDrawer} className='md:hidden'>
                        <HiBars3BottomRight className='h-6 w-6 text-[#222222]' />
                    </button>

                </div>

            </nav>
            <CartDrawer />
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4'>
                        {NAV_LINKS.map((l) => (
                            <Link key={l.label} to={l.to} onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar
