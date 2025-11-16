import { Bell, Search } from "lucide-react";
import React from "react";

export default function DashboardNavbar() {
    return (
        <nav className="w-full h-14 bg-transparent flex items-center justify-end md:justify-between px-6 fixed top-0 z-50">

            {/* Optional Left Side (Brand or Title) */}
            <div className="md:flex items-center font-semibold text-gray-800">

            </div>

            {/* Right side: Icons / User */}
            <div className="flex items-center space-x-4 ml-auto">
                {/* Search Icon */}
                <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                    <Search className="w-5 h-5 text-gray-600" />
                </button>

                {/* Notification Icon */}
                <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                </button>

                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform">
                    A
                </div>
            </div>
        </nav>
    );
}
