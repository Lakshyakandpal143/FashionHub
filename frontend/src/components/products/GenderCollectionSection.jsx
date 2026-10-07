import React from 'react'
import menCollection from '../../assets/menCollection.avif'
import womenCollection from '../../assets/womenCollection.avif'
import { Link } from 'react-router-dom'
const GenderCollectionSection = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>
                <div className='relative flex-1 md:pl-4'>
                    <img src={womenCollection} alt="Women's Collections " className='w-full h-[700px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                            Women's Collection
                        </h2>
                        <Link to='/collections/all?gender=Women' className="text-gray-900 underline">
                            Shop Now
                        </Link>
                    </div>
                </div>
                <div className='relative flex-1 md:pr-4'>
                    <img src={menCollection} alt="Men's Collections " className='w-full h-[700px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                            Men's Collection
                        </h2>
                        <Link to='/collections/all?gender=Men' className="text-gray-900 underline">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderCollectionSection