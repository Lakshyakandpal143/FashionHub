import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import { ProductGrid } from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturesSection from '../components/products/FeaturesSection'
import useFetch from '../hooks/useFetch'

const Home = () => {
    const { data: bestSeller } = useFetch('/products/best-seller');
    const { data: womenTops } = useFetch('/products?gender=Women&category=Top%20Wear&limit=8');

    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />
            {bestSeller && (
                <>
                    <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
                    <ProductDetails key={bestSeller._id} productId={bestSeller._id} />
                </>
            )}
            {womenTops?.length > 0 && (
                <div className='container mx-auto'>
                    <h2 className='text-3xl text-center font-bold mb-4'>
                        Top Wears For Women
                    </h2>
                    <ProductGrid products={womenTops} />
                </div>
            )}
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    )
}

export default Home
