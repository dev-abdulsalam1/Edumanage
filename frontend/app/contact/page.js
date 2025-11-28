"use client";
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Contact() {
    return (
        <section id="contact">
            <Navbar />

            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Have questions or need support? We’re here to help you anytime.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="grid md:grid-cols-3 gap-10 mb-16">
                        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                            <Mail className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-2">support@edumanage.com</p>
                            <p className="text-gray-600">info@edumanage.com</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                            <Phone className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                            <p className="text-gray-600 mb-2">+252 61 234 5678</p>
                            <p className="text-gray-600">+252 90 876 5432</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                            <MapPin className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                            <p className="text-gray-600">SIMAD University Campus, Mogadishu, Somalia</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow p-10 md:p-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Send Us a Message
                        </h2>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="md:col-span-2 bg-green-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-transparent hover:border-2 hover:border-green-500 hover:text-green-500 transition flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    );
}
