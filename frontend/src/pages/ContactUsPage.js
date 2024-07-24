import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import 'tailwindcss/tailwind.css';

const submitContactForm = async (formData) => {
    try {
        const response = await fetch('https://api.example.com/contact', { // Replace with your actual API endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit contact form");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default function ContactUsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'success' or 'error'
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalType("");
        setModalMessage("");

        try {
            const response = await submitContactForm({ name, email, subject, message });
            setModalMessage("Thank you for reaching out! We will get back to you soon.");
            setModalType("success");
        } catch (error) {
            setModalMessage(error.message);
            setModalType("error");
        }
        setModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject of your message"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your message"
                            className="border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            {/* Company Information */}
            <div className="mt-10 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-extrabold text-blue-900 mb-4">AL Logistics</h3>
                <p className="text-lg font-semibold text-gray-700 mb-2">Phone: +234 810 123 4567</p>
                <p className="text-lg font-semibold text-gray-700 mb-4">Address: 123 Logistic Avenue, Lagos, Nigeria</p>
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
                    <p className="text-sm text-center">{modalMessage}</p>
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
