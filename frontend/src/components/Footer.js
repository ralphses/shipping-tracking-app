import React from "react";

export default function Footer() {
  return (
    <footer className="p-4 text-center bg-green-800 text-yellow-50">
      <div className="space-x-4">
        <a href="#privacy">Privacy Policy</a>
        <a href="#contact">Contact Us</a>
        <a href="#copyright">Copyright © {new Date().getFullYear()}</a>
      </div>
    </footer>
  );
}
