"use client";

import React, { useState } from "react";
import { Search, Eye, Edit, Trash2, Filter } from "lucide-react";

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const teachers = [
        { id: "TEA1001", name: "Abdi Ahmed", subject: "Mathematics", experience: "5 yrs", status: "Active", contact: "123-456-789" },
        { id: "TEA1002", name: "Fatima Noor", subject: "Physics", experience: "3 yrs", status: "Active", contact: "987-654-321" },
        { id: "TEA1003", name: "Mohamed Hassan", subject: "English", experience: "7 yrs", status: "On Leave", contact: "555-123-456" },
        { id: "TEA1004", name: "Amina Ali", subject: "Chemistry", experience: "10 yrs", status: "Retired", contact: "444-555-666" },
    ];

    const statusStyles = {
        Active: "bg-green-100 text-green-700",
        "On Leave": "bg-yellow-100 text-yellow-700",
        Retired: "bg-gray-100 text-gray-600",
    };

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 h-full">
            {/* Page Title & Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
                    <p className="text-gray-500">Manage teaching staff and assignments</p>
                </div>
                <button className="mt-3 sm:mt-0 bg-green-800 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition-all">
                    + Add New Teacher
                </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                {/* Search Input */}
                <div className="relative flex-1 sm:max-w-sm">
                    <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search students by name or ID..."
                        className="w-[1030] pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Button / Component */}
                <button className="flex bg-gray-200 p-2 rounded-sm border-2 border-gray-300">
                    <Filter /> Filter
                </button>
            </div>


            {/* HTML Table */}
            <div className="overflow-x-auto bg-white rounded-2xl p-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <caption className="text-left text-gray-500 p-4">List of all teachers in the school</caption>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teacher Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teacher ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-3 font-medium">{teacher.name}</td>
                                    <td className="px-6 py-3">{teacher.id}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[teacher.status]}`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">{teacher.contact}</td>
                                    <td className="px-6 py-3 text-center flex justify-center gap-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-yellow-600 hover:text-yellow-800">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No teachers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
