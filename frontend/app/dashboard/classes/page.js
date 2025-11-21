"use client";

import { useState } from "react";
import { Plus, Users, CalendarDays, User } from "lucide-react";

const fakeClasses = [
    {
        id: "c101",
        className: "Class 7A",
        gradeLevel: "Grade 7",
        roomName: "Room A1",
        teacherName: "Mr. Ahmed Mohamed",
        studentsCount: 28,
        academicYear: "2024–2025",
        schedule: "Sun–Thu • 7:00–11:00 AM",
    },
    {
        id: "c102",
        className: "Class 7B",
        gradeLevel: "Grade 7",
        roomName: "Room B2",
        teacherName: "Mr. Hassan Omar",
        studentsCount: 26,
        academicYear: "2024–2025",
        schedule: "Sun–Thu • 11:00–3:00 PM",
    },
    {
        id: "c103",
        className: "Class 8A",
        gradeLevel: "Grade 8",
        roomName: "Room A8",
        teacherName: "Ms. Hodan Ibrahim",
        studentsCount: 30,
        academicYear: "2024–2025",
        schedule: "Sun–Thu • 7:00–11:00 AM",
    },
    {
        id: "c104",
        className: "Class 9A",
        gradeLevel: "Grade 9",
        roomName: "Room M7",
        teacherName: "Ms. Fadumo Ali",
        studentsCount: 32,
        academicYear: "2024–2025",
        schedule: "Sun–Thu • 8:00–12:00 PM",
    },
];

export default function ClassesPage() {
    const [classes] = useState(fakeClasses);

    return (
        <div className="p-6">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Classes Dashboard</h1>
                    <p className="text-gray-500">Manage all classes, teachers, and sections</p>
                </div>

                <button className="px-4 py-2 bg-green-700 text-white rounded-xl flex items-center gap-2 hover:bg-green-800 transition">
                    <Plus size={18} />
                    Add Class
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div
                        key={cls.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition cursor-pointer"
                    >
                        {/* Class Title */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {cls.className}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {cls.gradeLevel} • {cls.academicYear}
                                </p>
                            </div>

                            <div className="bg-green-200 text-green-800 px-3 py-1 rounded-lg text-sm font-semibold">
                                {cls.roomName}
                            </div>
                        </div>

                        {/* Teacher */}
                        <div className="mt-4 flex items-center gap-2 text-gray-700">
                            <User size={18} className="text-blue-600" />
                            <span className="font-medium">{cls.teacherName}</span>
                        </div>

                        {/* Students */}
                        <div className="mt-2 flex items-center gap-2 text-gray-700">
                            <Users size={18} className="text-green-600" />
                            <span>{cls.studentsCount} Students</span>
                        </div>

                        {/* Schedule */}
                        <div className="mt-2 flex items-center gap-2 text-gray-700">
                            <CalendarDays size={18} className="text-purple-600" />
                            <span>{cls.schedule}</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-6">
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                View
                            </button>

                            <div className="flex gap-2">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                                    Edit
                                </button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
