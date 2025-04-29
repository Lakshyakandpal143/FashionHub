import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2'
import Search from './Search'
import CartDrawer from '../layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
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
                    <Link to='#' className='text-[#222222] hover:text-[#C1444F] text-sm font-medium uppercase'>Men</Link>
                    <Link to='#' className='text-[#222222] hover:text-[#C1444F] text-sm font-medium uppercase'>Women</Link>
                    <Link to='#' className='text-[#222222] hover:text-[#C1444F] text-sm font-medium uppercase'>Top wear</Link>
                    <Link to='#' className='text-[#222222] hover:text-[#C1444F] text-sm font-medium uppercase'>Bottom wear</Link>

                </div>
                <div className='flex items-center space-x-4'>
                    <Link to='/profile' className='hover:text-[#C1444F]'>
                        <HiOutlineUser className='h-6 w-6 text-[#222222] hover:text-[#C1444F]' />
                    </Link>
                    <button onClick={toggleCartDrawer} className='relative hover:text-[#C1444F]'>
                        <HiOutlineShoppingBag className='h-6 w-6 text-[#222222] hover:text-[#C1444F]' />
                        <span className='absolute -top-1 -right-3 bg-[#2E0039] text-[#F5F5F5] text-xs rounded-full px-2 py-0.5'>4
                        </span>
                    </button>
                    <div className='overflow-hidden'>
                        <Search />
                    </div>

                    <button onClick={toggleNavDrawer} className='md:hidden'>
                        <HiBars3BottomRight className='h-6 w-6 text-[#222222]' />
                    </button>

                </div>

            </nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Men
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Women
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Top wear
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
                            Bottom wear
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar