import React from "react";
import logo from "../assets/logo.png"; // Update the path accordingly

export default function Footer() {
    return (
        <footer className="p-6 text-center bg-blue-800 text-white">
            <div className="container mx-auto flex flex-col items-center">

                <div className="mt-4 text-sm">
                    <a href="#privacy" className="hover:text-gray-300 transition duration-300">
                        Privacy Policy
                    </a>{" "}
                    |{" "}
                    <a href="#contact" className="hover:text-gray-300 transition duration-300">
                        Contact Us
                    </a>{" "}
                    |{" "}
                    <span>Copyright © {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}
