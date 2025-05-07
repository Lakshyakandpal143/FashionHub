import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ProductGrid } from './ProductGrid';

const selectedProduct = {
    name: "Bomber Jacket",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish Jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
        {
            url: "https://picsum.photos/500/500?random=1",
            altText: "RedJacket",
        },
        {
            url: "https://picsum.photos/500/500?random=2",
            altText: "BlackJacket",
        }
    ],
};

const similarProducts = [
    {
        _id: 1,
        name: "Product",
        price: 120,
        images: [{ url: "https://picsum.photos/500/500?random=13" }],
    },
    {
        _id: 2,
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
    },
]

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart.", { duration: 1000 });
            return;
        }
        setIsButtonDisabled(true);

        setTimeout(() => {
            toast.success("Product added to the cart!", { duration: 1000 });
            setIsButtonDisabled(false);
        }, 500);
    }
    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {selectedProduct.images.map((image, index) => (
                            <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`} onClick={() => setMainImage(image.url)} />
                        ))}
                    </div>
                    <div className='md:w-1/2'>
                        <div className='mb-4 h-[550px] overflow-hidden rounded-lg'>
                            <img src={mainImage} alt="Main Product" className='w-full h-full object-cover' />
                        </div>
                    </div>

                    <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                        {selectedProduct.images.map((image, index) => (
                            <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`} onClick={() => setMainImage(image.url)} />
                        ))}
                    </div>
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-3xl md:text-2xl font-semibold mb-2'>{selectedProduct.name}</h1>
                        <p className='text-lg text-gray-600 mb-1 line-through'>
                            &#8377;{selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                        </p>
                        <p className='text-xl text-gray-500 mb-2'>
                            &#8377;{selectedProduct.price}
                        </p>

                        <p className='text-gray-600 mb-4'>
                            {selectedProduct.description}
                        </p>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProduct.colors.map((color) => {
                                    return (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                                            style={{
                                                backgroundColor: color.toLocaleLowerCase(),
                                                filter: "brightness(0.5)",  // Adjusted filter value
                                            }}
                                        ></button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='flex gap-2 mt-2 mb-4'>
                            {selectedProduct.size.map((size) => {
                                return (
                                    <button key={size} className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`} onClick={() => setSelectedSize(size)}>
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                        <div className='mb-4 '>
                            <p className='text-gray-700'>Quantity:</p>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button className={`px-2 py-1 bg-gray-200 rounded text-lg ${quantity === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200"}`} onClick={() => handleQuantityChange("minus")}>-</button>
                                <span className='text-lg'>{quantity}</span>
                                <button className='px-2 py-1 bg-gray-200 rounded text-lg' onClick={() => handleQuantityChange("plus")}>+</button>
                            </div>
                        </div>

                        <button onClick={handleAddToCart} disabled={isButtonDisabled} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>{isButtonDisabled ? "Adding..." : "ADD TO CART"}</button>

                        <div className='mt-10 text-gray-700'>
                            <h3 className='text-xl font-bold md-4'>Characteristics:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    <tr>
                                        <td className='py-1'>
                                            Brand
                                        </td>
                                        <td className='py-1'>
                                            {selectedProduct.brand}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>
                                            Material
                                        </td>
                                        <td className='py-1'>
                                            {selectedProduct.material}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                    <ProductGrid products={similarProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
