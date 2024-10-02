import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import 'tailwindcss/tailwind.css';

const fetchOrder = async (orderId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/shipping-order/${orderId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch order");
        }

        const responseData = await response.json();
        return responseData.data; // Return the 'data' field from the API response
    } catch (error) {
        // console.log(error);

        throw new Error(error.message);
    }
};

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'success' or 'error'

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        setError("");
        setModalType("");
        setOrder(null);

        try {
            const orderData = await fetchOrder(orderId);
            setOrder(orderData);
            setModalType("success");
        } catch (error) {
            setError(error.message);
            setModalType("error");
        }
        setModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
                    Track Your Order
                </h2>
                <form onSubmit={handleTrackOrder} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Order ID</label>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter your order ID"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Track Order
                        </button>
                    </div>
                </form>

                {/* Display order details if available */}
                {order && modalType === "success" && (
                    <div className="mt-6 bg-green-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-green-900 mb-2">Order Details</h3>
                        <p><strong>Order ID:</strong> {order.reference}</p>
                        <p><strong>From:</strong> {order.sender}</p>
                        <p><strong>To:</strong> {order.receiver}</p>
                        <p><strong>Description:</strong> {order.description}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Current Location:</strong> {order.location.address} at {order.location.time}</p>
                    </div>
                )}
            </div>

            {/* Modal for success or error messages */}
            <Dialog
                as="div"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">
                        {modalType === "success" ? "Success!" : "Error"}
                    </h3>
                    <p className="text-sm text-center">
                        {modalType === "success" ? "Order fetched successfully!" : error}
                    </p>
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
