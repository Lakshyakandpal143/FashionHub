import React, { useState } from 'react';
import { toast } from 'sonner';
import { ProductGrid } from './ProductGrid';
import useFetch from '../../hooks/useFetch';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/pricing';

const ProductDetails = ({ productId }) => {
    const { data: product, loading, error } = useFetch(productId ? `/products/${productId}` : null);
    const { data: similarProducts } = useFetch(productId ? `/products/similar/${productId}` : null);
    const { addItem, setCartOpen } = useCart();

    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    if (loading) return <div className='p-10 text-center text-gray-500'>Loading product...</div>;
    if (error || !product) return <div className='p-10 text-center text-red-600'>{error || 'Product not found'}</div>;

    const inStock = product.countInStock > 0;
    const shownImage = mainImage || product.images?.[0]?.url;

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => Math.min(prev + 1, product.countInStock));
        if (action === "minus") setQuantity((prev) => Math.max(prev - 1, 1));
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart.", { duration: 1500 });
            return;
        }
        addItem({
            productId: product._id,
            name: product.name,
            image: product.images?.[0]?.url,
            price: product.price,
            size: selectedSize,
            color: selectedColor,
            quantity,
            stock: product.countInStock,
        });
        toast.success("Product added to the cart!", { duration: 1000 });
        setCartOpen(true);
    }

    const thumbs = (cls) => product.images?.map((image, index) => (
        <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${cls} ${shownImage === image.url ? "border-black" : "border-gray-300"}`} onClick={() => setMainImage(image.url)} />
    ));

    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>{thumbs('')}</div>
                    <div className='md:w-1/2'>
                        <div className='mb-4 h-[550px] overflow-hidden rounded-lg'>
                            <img src={shownImage} alt={product.name} className='w-full h-full object-cover' />
                        </div>
                    </div>

                    <div className='md:hidden flex overflow-x-auto space-x-4 mb-4'>{thumbs('shrink-0')}</div>
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-3xl md:text-2xl font-semibold mb-2'>{product.name}</h1>
                        {product.originalPrice > product.price && (
                            <p className='text-lg text-gray-600 mb-1 line-through'>{formatPrice(product.originalPrice)}</p>
                        )}
                        <p className='text-xl text-gray-500 mb-2'>{formatPrice(product.price)}</p>

                        <p className='text-gray-600 mb-4'>{product.description}</p>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        title={color}
                                        aria-label={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Size:</p>
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {product.sizes.map((size) => (
                                    <button key={size} className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`} onClick={() => setSelectedSize(size)}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mb-4 '>
                            <p className='text-gray-700'>Quantity:</p>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg disabled:text-gray-400 disabled:cursor-not-allowed' disabled={quantity <= 1} onClick={() => handleQuantityChange("minus")}>-</button>
                                <span className='text-lg'>{quantity}</span>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg disabled:text-gray-400 disabled:cursor-not-allowed' disabled={quantity >= product.countInStock} onClick={() => handleQuantityChange("plus")}>+</button>
                            </div>
                            {inStock && product.countInStock <= 5 && (
                                <p className='text-sm text-red-600 mt-2'>Only {product.countInStock} left!</p>
                            )}
                        </div>

                        <button onClick={handleAddToCart} disabled={!inStock} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${!inStock ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>
                            {inStock ? "ADD TO CART" : "OUT OF STOCK"}
                        </button>

                        <div className='mt-10 text-gray-700'>
                            <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    <tr><td className='py-1'>Brand</td><td className='py-1'>{product.brand || '-'}</td></tr>
                                    <tr><td className='py-1'>Material</td><td className='py-1'>{product.material || '-'}</td></tr>
                                    <tr><td className='py-1'>Category</td><td className='py-1'>{product.category}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {similarProducts?.length > 0 && (
                    <div className='mt-20'>
                        <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                        <ProductGrid products={similarProducts} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
