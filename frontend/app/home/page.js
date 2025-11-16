"use client";
import React from "react";
import Image from "next/image";
import HeroImage from "@/public/school-hero.svg"; // make sure to place your image in /public
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Navbar />
            <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-10 h-screen">

                {/* Left: Text content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 drop-shadow-lg">
                        Empower Your School with Smart Management 🎓
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-8">
                        Streamline administrative tasks, enhance communication, and focus on what matters most —
                        providing quality education. Everything you need in one unified platform.
                    </p>
                    <Link href="/dashboard">
                        <button className="bg-green-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-transparent hover:border-2 hover:border-green-500 hover:text-green-500 transition">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Right: Hero Image */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="relative w-80 h-80 md:w-140 md:h-100">
                        <Image
                            src={HeroImage}
                            alt="School Management Illustration"
                            className="object-contain"
                            fill
                        />
                    </div>
                </div>

            </section>
        </>
    );
}
