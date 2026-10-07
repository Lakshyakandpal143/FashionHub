import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import { ProductGrid } from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturesSection from '../components/products/FeaturesSection'

const placeholderProducts = [
    {
        _id: 1,
        name: "Denim Jacket",
        price: 110,
        images: [{ url: "https://picsum.photos/500/500?random=11" }],
    },
    {
        _id: 2,
        name: "Leather Vest",
        price: 95,
        images: [{ url: "https://picsum.photos/500/500?random=12" }],
    },
    {
        _id: 3,
        name: "Casual Hoodie",
        price: 75,
        images: [{ url: "https://picsum.photos/500/500?random=13" }],
    },
    {
        _id: 4,
        name: "Wool Overcoat",
        price: 180,
        images: [{ url: "https://picsum.photos/500/500?random=14" }],
    },
    {
        _id: 5,
        name: "Bomber Jacket",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=15" }],
    },
    {
        _id: 6,
        name: "Trench Coat",
        price: 150,
        images: [{ url: "https://picsum.photos/500/500?random=16" }],
    },
    {
        _id: 7,
        name: "Fleece Pullover",
        price: 85,
        images: [{ url: "https://picsum.photos/500/500?random=17" }],
    },
    {
        _id: 8,
        name: "Puffer Jacket",
        price: 140,
        images: [{ url: "https://picsum.photos/500/500?random=18" }],
    },
];


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
            <FeaturedCollection />
            <FeaturesSection />
        </div>
    )
}

export default Home