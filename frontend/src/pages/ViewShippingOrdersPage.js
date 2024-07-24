import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';

const fetchOrders = async (email, page) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/shipping-order?user=${email}&page=${page}`, { // Replace with your actual API endpoint
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default function ViewShippingOrdersPage() {
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await fetchOrders(email, page);
            console.log(data);
            setOrders(data.data.orders);
            setTotalPages(data.data.noOfPages);
        } catch (error) {
            setError(error.message);
            setModalContent("An error occurred while fetching orders.");
            setModalOpen(true);
        }
    };

    const handleViewOrder = (order) => {
        setModalContent(`
      Sender: ${order.sender}
      Receiver: ${order.receiver}
      Description: ${order.description}
      Reference: ${order.reference}
      Status: ${order.status}
      Location: ${order.location.address} at ${order.location.time}
    `);
        setModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
                    View Shipping Orders
                </h2>
                <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-lg p-3 w-full max-w-xs mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                    >
                        Submit
                    </button>
                </form>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                {orders.length > 0 && (
                    <div className="space-y-4">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md flex justify-between items-center"
                            >
                                <div className="flex-1">
                                    <p className="font-semibold">Reference: {order.reference}</p>
                                    <p>Status: {order.status}</p>
                                </div>
                                <button
                                    onClick={() => handleViewOrder(order)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for order details */}
            <Dialog
                as="div"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">
                        Order Details
                    </h3>
                    <pre className="text-sm">{modalContent}</pre>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
