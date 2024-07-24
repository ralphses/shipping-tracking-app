import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import 'tailwindcss/tailwind.css';
import { useNavigate } from "react-router-dom";

const createAccount = async (accountData) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/user', { // Replace with your actual API endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "User with email already exists!");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default function CreateAccountPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'success' or 'error'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setModalType("");

        try {
            const accountData = { name, email, phone, address };
            await createAccount(accountData);
            setSuccess("Account created successfully!");
            setModalType("success");
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
        } catch (error) {
            setError(error.message);
            setModalType("error");
        }
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        navigate("/"); // Navigate to homepage
    };


    return (
        <div className="bg-gradient-to-r from-green-50 to-green-200 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
                    Create a New Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Create Account
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
                onClose={() => setModalOpen(false)}
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
                            onClick={handleModalClose} // Close modal and navigate to homepage
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
