import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { formatPrice } from '../../utils/pricing';

const NewArrivals = () => {
    // Ref to the scrollable container
    const scrollRef = useRef(null);

    // State to track dragging for scroll interaction
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0); // Initial X position of mouse
    const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll position

    // States to toggle scroll buttons
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Latest products from the API
    const { data } = useFetch('/products/new-arrivals');
    const newArrivals = data || [];

    // Start dragging: capture initial position
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    // Update scroll position on drag
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // End dragging
    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    // Scroll left or right when buttons clicked
    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // Check scroll position to enable/disable nav buttons
    const updateScrollButton = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(leftScroll < maxScrollLeft - 5);
        }
    }

    // Attach scroll listener on mount, cleanup on unmount
    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButton);
            updateScrollButton();
            return () => container.removeEventListener("scroll", updateScrollButton);
        }
    }, [newArrivals.length]);

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10  relative'>
                <h2 className=' text-3xl font-bold mb-4'>
                    Explore New Arrivals
                </h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest styles straight off the runway,freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>

                {/* Scroll buttons */}
                <div className='absolute right-0 bottom-[-30px] flex space-x-2 pr-4'>
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded-full border ${canScrollLeft ? " bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"} `}
                    >
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded-full border ${canScrollRight ? " bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"} `}
                    >
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            {/* Scrollable product list with drag support */}
            <div
                ref={scrollRef}
                className={`container mx-auto pl-4 pr-4 overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {/* Render each product card */}
                {newArrivals.map((product) => (
                    <div key={product._id} className='min-w-[90%] sm:min-w-[45%] lg:min-w-[30%] relative'>
                        <img
                            src={product.images?.[0]?.url}
                            alt={product.images?.[0]?.altText || product.name}
                            className='w-full h-[500px] object-cover rounded-lg'
                            draggable="false"
                        />
                        {/* Overlay with product info */}
                        <div className='absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-md text-black p-4 rounded-b-lg'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>{formatPrice(product.price)}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals;
