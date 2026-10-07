import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/products/FilterSidebar'
import SortOptions from '../components/products/SortOptions'
import { ProductGrid } from '../components/products/ProductGrid'
import useFetch from '../hooks/useFetch'

const CollectionPage = () => {
    const [searchParams] = useSearchParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const query = searchParams.toString();
    const { data: products, loading, error } = useFetch(`/products${query ? `?${query}` : ''}`);
    const search = searchParams.get('search');

    return (
        <div className='flex flex-col lg:flex-row'>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2' /> Filters
            </button>

            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 border-r bg-white overflow-y-auto`}>
                <FilterSidebar />
            </div>

            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'>
                    {search ? `Results for "${search}"` : 'All Collection'}
                </h2>
                <SortOptions />
                {loading && <p className='text-center text-gray-500 py-10'>Loading products...</p>}
                {error && <p className='text-center text-red-600 py-10'>{error}</p>}
                {!loading && !error && products?.length === 0 && (
                    <p className='text-center text-gray-500 py-10'>No products match your filters.</p>
                )}
                {!loading && products?.length > 0 && <ProductGrid products={products} />}
            </div>
        </div>
    )
}

export default CollectionPage
