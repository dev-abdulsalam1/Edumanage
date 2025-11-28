"use client";
import React from "react";
import { Users, CalendarCheck, BookCopy, MessagesSquare } from "lucide-react";
import Navbar from "@/components/Navbar";


export default function Services() {
    return (
        <section id="services">
            <Navbar />
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything You Need to Run Your School
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl mb-12">
                        Powerful features designed to simplify school administration and enhance the educational experience.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Student Records */}
                        <div className="bg-white p-10 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl hover:border-green-200 hover:border-2 transition">
                            <div className="flex justify-start">
                                <Users className="w-17 h-17 text-green-500 mb-4 bg-green-200 p-2 rounded-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-start">
                                Student Records
                            </h3>
                            <p className="text-gray-600 text-start">
                                Manage comprehensive student profiles, enrollment data, and academic history in one centralized system.
                            </p>
                        </div>

                        {/* Grade Reports */}
                        <div className="bg-white p-10 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl hover:border-green-200 hover:border-2 transition">
                            <div className="flex justify-start">
                                <BookCopy className="w-17 h-17 text-purple-500 mb-4 bg-purple-200 p-2 rounded-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-start">
                                Grade Reports
                            </h3>
                            <p className="text-gray-600 text-start">
                                Generate detailed grade reports and progress analytics to track student performance effortlessly.
                            </p>
                        </div>

                        {/* Communication Tools */}
                        <div className="bg-white p-10 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl hover:border-green-200 hover:border-2 transition">
                            <div className="flex justify-start">
                                <MessagesSquare className="w-17 h-17 text-blue-500 mb-4 bg-blue-200 p-2 rounded-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-start">
                                Communication Tools
                            </h3>
                            <p className="text-gray-600 text-start">
                                Enable seamless communication between teachers, students, and parents through integrated messaging.
                            </p>
                        </div>

                        {/* Attendance Tracking */}
                        <div className="bg-white p-10 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl hover:border-green-200 hover:border-2 transition">
                            <div className="flex justify-start">
                                <CalendarCheck className="w-17 h-17 text-cyan-500 mb-4 bg-cyan-200 p-2 rounded-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-start">
                                Attendance Tracking
                            </h3>
                            <p className="text-gray-600 text-start">
                                Monitor attendance in real-time with automated notifications and detailed reporting capabilities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
