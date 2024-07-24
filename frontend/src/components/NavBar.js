import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Update the path accordingly

const navigation = [
  { name: "Home", href: "/" },
  { name: "Create Account", href: "/register" },
  { name: "Track Order", href: "/orders/track" },
  { name: "Create Order", href: "/orders/create" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <nav className="flex items-center justify-between lg:px-8">
          <div className="flex lg:flex-1 items-center">
            <a href="/" className="flex items-center text-2xl font-extrabold">
              <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
                type="button"
                className="p-2 text-xl"
                onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-8 w-8" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-6 text-lg">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className="font-semibold hover:text-gray-300 transition duration-300"
                >
                  {item.name}
                </a>
            ))}
          </div>
        </nav>

        <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50 bg-blue-700 bg-opacity-80" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-72 sm:max-w-sm bg-white">
            <div className="flex items-center justify-between p-4">
              <a
                  href="/"
                  className="flex items-center text-2xl font-extrabold text-black"
              >
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                OrderTrack
              </a>
              <button
                  type="button"
                  className="text-xl"
                  onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="mt-4">
              {navigation.map((item) => (
                  <a
                      key={item.name}
                      href={item.href}
                      className="block py-2 pl-4 text-lg font-semibold hover:bg-blue-100 transition duration-300"
                  >
                    {item.name}
                  </a>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
  );
};

export default Navbar;
