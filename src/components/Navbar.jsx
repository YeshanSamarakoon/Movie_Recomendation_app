import { useState } from "react";
import { navLinks } from "../constants/index";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className= "shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 font-bold">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img src="/src/assets/logo.png" className="h-10" alt="Logo" />
          <span className="text-2xl font-semibold dark:text-white">MovieMaze</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`w-full md:w-auto ${isOpen ? "block" : "hidden"} md:flex md:items-center`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            {navLinks.map(({ id, href, name }) => (
              <li key={id}>
                <a href={href} className="block py-2 px-3 text-gray-900 hover:text-red-400 dark:text-white dark:hover:text-red-500">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
