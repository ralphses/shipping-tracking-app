import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import 'tailwindcss/tailwind.css';

const createOrder = async (orderData) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/shipping-order', { // Replace with your actual API endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create order");
        }

        return await response.json(); // Return the response data, which should include the order ID
    } catch (error) {
        throw new Error(error.message);
    }
};

export default function CreateOrderPage() {
    const [sender, setSender] = useState("");
    const [description, setDescription] = useState("");
    const [receiver, setReceiver] = useState("");
    const [destination, setDestination] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'success' or 'error'
    const [orderId, setOrderId] = useState(""); // To store the order ID

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setModalType("");

        try {
            const orderData = { sender, description, receiver, destination };
            const response = await createOrder(orderData);
            setOrderId(response.data); // Assume the response contains the orderId
            setSuccess("Order created successfully!");
            setModalType("success");
            setSender("");
            setDescription("");
            setReceiver("");
            setDestination("");
        } catch (error) {
            setError(error.message);
            setModalType("error");
        }
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        if (modalType === "success") {
            navigate(`/order/view/${orderId}`); // Redirect to the ShippingOrderPage with orderId
        }
    };

    return (
        <div className="bg-gradient-to-r from-green-50 to-green-200 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
                    Create a New Shipping Order
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Sender Email</label>
                        <input
                            type="email"
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            placeholder="Enter sender's email"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Receiver Email</label>
                        <input
                            type="email"
                            value={receiver}
                            onChange={(e) => setReceiver(e.target.value)}
                            placeholder="Enter receiver's email"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Destination</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Create Order
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal for success or error messages */}
            <Dialog
                as="div"
                open={modalOpen}
                onClose={handleModalClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 text-center">
                        {modalType === "success" ? "Success!" : "Error"}
                    </h3>
                    <p className="text-sm text-center">
                        {modalType === "success" ? success : error}
                    </p>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleModalClose}
                            className="bg-green-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
