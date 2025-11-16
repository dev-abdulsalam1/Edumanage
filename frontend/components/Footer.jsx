"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-green-600 text-white py-12">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                {/* Brand / About */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">EduManage</h2>
                    <p className="text-gray-100 text-sm leading-relaxed">
                        Empowering schools with smart, efficient management solutions.
                        Streamline communication, records, and performance tracking — all in one place.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-100">
                        <li><a href="/" className="hover:text-gray-300 transition">Home</a></li>
                        <li><a href="/about" className="hover:text-gray-300 transition">About</a></li>
                        <li><a href="/services" className="hover:text-gray-300 transition">Services</a></li>
                        <li><a href="/contact" className="hover:text-gray-300 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact / Social */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <p className="text-gray-100 mb-2">support@edumanage.com</p>
                    <p className="text-gray-100 mb-6">+252 61 234 5678</p>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-300 transition"><Facebook /></a>
                        <a href="#" className="hover:text-gray-300 transition"><Twitter /></a>
                        <a href="#" className="hover:text-gray-300 transition"><Instagram /></a>
                        <a href="#" className="hover:text-gray-300 transition"><Mail /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-500 mt-10 pt-6 text-center text-gray-200 text-sm">
                © {new Date().getFullYear()} EduManage. All rights reserved.
            </div>
        </footer>
    );
}
