import React, { useEffect, useState } from 'react'

const MyOrderPage = () => {
    const [orders, setOrder] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "12345",
                    createAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product1",
                            image: "https://picsum.photos/500/500?random=17",
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true,
                },
                {
                    _id: "12346",
                    createAt: new Date(),
                    shippingAddress: { city: "Washington DC", country: "USA" },
                    orderItems: [
                        {
                            name: "Product2",
                            image: "https://picsum.photos/500/500?random=13",
                        },
                    ],
                    totalPrice: 100,
                    isPaid: false,
                },
            ];
            setOrder(mockOrders);
        }, 1000);
    }, []); // Added dependency array

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-sm uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order Id</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className='border-b hover:border-gray-50 cursor-pointer'>
                                    <td className='w-10 h-10 sm:h-12 sm:w-12'>
                                        <img
                                            src={order.orderItems[0].image}
                                            alt={order.orderItems[0].name}
                                            className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                                        />
                                    </td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap' >#{order._id}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.createAt.toLocaleDateString()}{" "} {new Date(order.createAt).toLocaleTimeString()}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.shippingAddress ? `${order.shippingAddress.city},${order.shippingAddress.country}` : "N/A"}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.orderItems.length} item(s)</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>&#8377;{order.totalPrice}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                        <span className={
                                            `${order.isPaid ?
                                                "text-green-600 bg-green-100"
                                                :
                                                'text-red-600 bg-red-100'
                                            } px-2 py-1 rounded-full text-sm sm:text-sm font-medium`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default MyOrderPage;
