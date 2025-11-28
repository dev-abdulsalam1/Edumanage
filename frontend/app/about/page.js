"use client";
import React from "react";
import Image from "next/image";
import AboutImage from "@/public/about-school.svg"; // Add your own image in /public
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <section id="about">
            <Navbar />
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">

                    {/* Left: Text Section */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            About Our Platform
                        </h1>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            At <span className="font-semibold text-green-600">EduManage</span>, our mission is to empower schools with
                            innovative digital tools that simplify management and improve
                            communication across all departments. We believe technology should
                            help educators focus on what truly matters — <strong>quality learning and student success.</strong>
                        </p>
                        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                            From student records and attendance tracking to communication and
                            performance analytics, EduManage provides an all-in-one solution for
                            every aspect of school administration.
                        </p>

                        <button className="bg-green-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-transparent hover:border-2 hover:border-green-500 hover:text-green-500 transition">
                            Learn More
                        </button>
                    </div>

                    {/* Right: Illustration */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative w-80 h-80 md:w-120 md:h-120">
                            <Image
                                src={AboutImage}
                                alt="About EduManage Illustration"
                                className="object-contain"
                                fill
                            />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
