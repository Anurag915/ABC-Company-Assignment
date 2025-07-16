import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4 mt-20 text-center shadow-inner fixed bottom-0 w-full z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} ABC. All rights reserved.
        </p>

        <div className="flex space-x-4 text-sm">
          <a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-blue-400 transition-colors duration-200">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-blue-400 transition-colors duration-200">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
