"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons from lucide-react

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-green-400 flex items-end space-x-1">
                    EduManage<span className="text-gray-800">.io</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex justify-end space-x-8 font-medium text-gray-700 md:items-center">
                    <Link href="#about" scroll={true} className="hover:text-green-200 transition">
                        About
                    </Link>
                    <Link href="#services" scroll={true} className="hover:text-green-200 transition">
                        Services
                    </Link>
                    <Link href="#contact" className="hover:text-green-200 transition">
                        Contact
                    </Link>
                    <Link
                        href="/login"
                        className="hidden md:inline-block bg-[#10cf3b] text-white px-5 py-2 rounded-lg hover:bg-green-500 transition"
                    >
                        Login
                    </Link>
                </div>
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setOpen(!open)}>
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="flex flex-col items-center space-y-4 py-4">
                        <Link href="/about" className="text-gray-700 hover:text-green-400">About</Link>
                        <Link href="/services" className="text-gray-700 hover:text-green-400">Services</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-green-400">Contact</Link>
                        <Link href="/login" className="bg-[#10cf3b] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Login</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
