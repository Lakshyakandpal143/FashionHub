import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

const Topbar = () => {
    return (
        <div className='bg-[#2E0039] text-[#F5F5F5]'>
            <div className='container mx-auto flex justify-between items-center py-2 px-3'>
                <div className='hidden md:flex items-center gap-4 p-2'>
                    <a href="#" className='hover:text-[#FF6F61]'> <TbBrandMeta className='h-5 w-5' /></a>
                    <a href="#" className='hover:text-[#FF6F61]'> <IoLogoInstagram className='h-5 w-5' /></a>
                    <a href="#" className='hover:text-[#FF6F61]'> <RiTwitterXLine className='h-4 w-4' /></a>
                </div>
                <div className='text-sm text-center flex-grow'>
                    <span>We ship worldwide - Fast and reliable shipping! </span>
                </div>
                <div className='text-sm hidden md:block'>
                    <a href="tel:+1234567890" className='hover:text-[#FF6F61]'>+1 (234) 567-890</a>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
