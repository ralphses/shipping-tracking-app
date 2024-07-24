import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import 'tailwindcss/tailwind.css';

const fetchShippingOrder = async (orderId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/shipping-order/${orderId}`); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error("Failed to fetch order details");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default function ShippingOrderPage() {
    const { orderId } = useParams(); // Extract order ID from URL
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const data = await fetchShippingOrder(orderId);
                setOrder(data.data);
            } catch (error) {
                setError(error.message);
                setModalOpen(true);
            }
        };

        getOrderDetails();
    }, [orderId]);

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleBackToHomepage = () => {
        navigate("/"); // Redirect to the homepage
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
                    Shipping Order Details
                </h2>
                {order ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Sender</h3>
                            <p className="text-lg text-gray-900">{order.sender}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Receiver</h3>
                            <p className="text-lg text-gray-900">{order.receiver}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Description</h3>
                            <p className="text-lg text-gray-900">{order.description}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Order ID</h3>
                            <p className="text-lg text-gray-900">{order.reference}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Status</h3>
                            <p className="text-lg text-gray-900">{order.status}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Current Location</h3>
                            <p className="text-lg text-gray-900">
                                Address: {order.location.address} <br />
                                Time: {order.location.time}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-900 text-center">Loading order details...</p>
                )}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleBackToHomepage}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                    >
                        Back to Homepage
                    </button>
                </div>
            </div>

            {/* Error Modal */}
            <Dialog
                as="div"
                open={modalOpen}
                onClose={handleModalClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                    <h3 className="text-lg font-semibold text-red-600 mb-4 text-center">
                        Error
                    </h3>
                    <p className="text-sm text-center">{error}</p>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleModalClose}
                            className="bg-red-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
