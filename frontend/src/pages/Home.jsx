import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import { ProductGrid } from '../components/products/ProductGrid'

const placeholderProducts = [
    {
        _id: 1,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=1" }],
    },
    {
        _id: 12,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=2" }],
    },
    {
        _id: 3,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
        _id: 4,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=4" }],
    }, {
        _id: 5,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=1" }],
    },
    {
        _id: 7,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=2" }],
    },
    {
        _id: 8,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
        _id: 9,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
]

const Home = () => {
    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />
            <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
            <ProductDetails />
            <div className='container mx-auto'>
                <h2 className='text-3xl text-center font-bold mb-4'>
                    Top Wears For Women
                </h2>
                <ProductGrid products={placeholderProducts} />
            </div>
        </div>
    )
}

export default Home