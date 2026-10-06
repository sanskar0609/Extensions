import React from 'react';

const Footer = ({ setCurrentPage }) => {
    return (
        <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-12 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="text-white text-lg font-semibold">
                        ExtensionHub
                    </div>

                    <div className="flex space-x-6 text-sm text-white/80">
                        <button onClick={() => setCurrentPage('aboutus')} className="hover:text-white transition">About Us</button>
                        <button onClick={() => setCurrentPage('developer')} className="hover:text-white transition">Developer</button>
                        <a href="mailto:sanskarsontakke06@gmail.com" className="hover:text-white transition">Contact</a>
                    </div>

                    <div className="text-sm text-white/60">
                        &copy; {new Date().getFullYear()} ExtensionHub. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
