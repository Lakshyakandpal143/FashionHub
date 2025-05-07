import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from 'react-icons/fi'
const Footer = () => {
    return (
        <footer className='border-t border-gray-300 mt-2 pt-12 pb-6'>
            <div className='container mx-auto pl-4 grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
                <div className='ml-2'>
                    <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                    <p className='text-gray-500 mb-4'>
                        Be the first to hear about new products, exclusive events, and online offers.
                    </p>
                    <p className='font-medium text-sm text-gray-600 mb-6'>
                        SignUp and get 10% off on your first order.
                    </p>

                    <form className='flex'>
                        <input placeholder='Enter your Email' type="email" className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-gray-500 transition-all' required />
                        <button className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                    </form>
                </div>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Men's Top Wear</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Men's Bottom Wear</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Women's Top Wear</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Women's Bottom Wear</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>About Us</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>FAQs</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>Features</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow US</h3>
                    <div className='flex items-center space-x-4 mb-6'>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <TbBrandMeta className='h-5 w-5' />
                        </a>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <IoLogoInstagram className='h-5 w-5' />
                        </a>
                        <a href="https://facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <RiTwitterXLine className='h-4 w-4' />
                        </a>
                    </div>
                    <p className='text-gray-500'>Call us</p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2' />
                        0123-456-789
                    </p>
                </div>
            </div>
            <div className='border-t  border-gray-300 mt-8'>
                <div className='container mx-auto  px-5 lg:px-0 pt-6'>
                    <p className='text-gray-500 text-sm tracking-tighter text-center'>© 2025, CompileTab. All Rights Reserved. </p>
                    <p className='text-gray-500 text-sm tracking-tighter text-center'>Made with &hearts; by Lakshya. </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer   