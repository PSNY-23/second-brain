import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 mt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h1 className="text-xl font-bold mb-2">Second Brain</h1>
          <p className="text-sm">
            Your go-to app for saving, managing, and organizing your favorite
            links efficiently.
          </p>
        </div>

        <div className="w-full md:w-1/3 text-center">
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/3 text-center md:text-right">
          <h2 className="text-lg font-bold mb-2">Stay Connected</h2>
          <form className="mb-4">
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 w-full md:w-auto text-black rounded-md"
              />
              <button className="bg-darkBlue hover:bg-darkBlue px-4 py-2 rounded-md">
                Subscribe
              </button>
            </div>
          </form>
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="#"
              className="text-lg hover:text-darkblue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="text-lg hover:text-darkBlue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-lg hover:text-darkBlue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black text-center text-sm py-3 mt-6">
        © {new Date().getFullYear()} Second Brain. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
