import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/products/ProductDetails'

// key={id} resets size/colour/quantity when navigating between products
const ProductPage = () => {
    const { id } = useParams();
    return <ProductDetails key={id} productId={id} />
}

export default ProductPage
