import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Sami Management System. All rights reserved.
        </p>
        <p className="text-lg text-gray-400 mt-2">
           Developed by MAK
        </p>
      </div>
    </footer>
  );
};

export default Footer;
