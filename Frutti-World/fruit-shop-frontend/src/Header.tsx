import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-10" />
        </div>

        {/* Right Side: Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500 transition">
            About Us
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-500 transition">
            Products
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition">
            Contact Us
          </Link>
          <Link to="/signin" className="text-gray-700 hover:text-blue-500 transition">
            Sign In
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-500 transition">
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col space-y-2 p-4 bg-white shadow-md">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-blue-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-700 hover:text-blue-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;