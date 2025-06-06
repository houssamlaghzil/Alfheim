import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 mt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
                <p className="text-center md:text-left text-sm">&copy; {new Date().getFullYear()} Alfheim IA. Tous droits réservés.</p>
                <div className="flex space-x-5">
                    <a href="#" aria-label="Facebook" className="hover:text-blue-600"><FaFacebookF /></a>
                    <a href="#" aria-label="Twitter" className="hover:text-blue-600"><FaTwitter /></a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"><FaLinkedinIn /></a>
                    <a href="#" aria-label="Instagram" className="hover:text-blue-600"><FaInstagram /></a>
                </div>
                <Link to="/contact" className="text-sm hover:underline">Contact</Link>
            </div>
        </footer>
    );
};

export default Footer;
