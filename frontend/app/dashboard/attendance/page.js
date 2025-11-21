"use client";

import { useState } from "react";
import { Users, CheckCircle, XCircle, Eye } from "lucide-react";

const fakeClasses = [
    {
        id: 1,
        className: "Grade 8",
        roomName: "Room A1",
        totalStudents: 32,
        presentToday: 28,
        absentToday: 4,
        classTeacher: "Mr. Abdullahi",
    },
    {
        id: 2,
        className: "Grade 9",
        roomName: "Room B3",
        totalStudents: 28,
        presentToday: 25,
        absentToday: 3,
        classTeacher: "Ms. Nimco",
    },
    {
        id: 3,
        className: "Grade 10",
        roomName: "Room C2",
        totalStudents: 25,
        presentToday: 22,
        absentToday: 3,
        classTeacher: "Mr. Omar",
    },
];

export default function AttendanceDashboard() {
    const [classes] = useState(fakeClasses);

    return (
        <div className="p-6">
            {/* Dashboard Header */}
            <h1 className="text-3xl font-bold mb-6">Attendance Dashboard</h1>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => {
                    const attendanceRate = (cls.presentToday / cls.totalStudents) * 100;
                    return (
                        <div
                            key={cls.id}
                            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            {/* Class Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-xl font-bold">{cls.className}</h2>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    {cls.roomName}
                                </span>
                            </div>

                            {/* Teacher */}
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium text-black">Teacher:</span> {cls.classTeacher}
                            </p>

                            {/* Attendance Stats */}
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-green-600" />
                                    <span>{cls.presentToday} Present</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <XCircle className="text-red-600" />
                                    <span>{cls.absentToday} Absent</span>
                                </div>
                            </div>

                            {/* Total Students & Rate */}
                            <div className="flex items-center gap-2 mt-2 text-gray-700">
                                <Users className="text-gray-500" />
                                <span>{cls.totalStudents} Students</span>
                                <span
                                    className={`ml-auto font-semibold ${attendanceRate >= 90
                                            ? "text-green-600"
                                            : attendanceRate >= 75
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                        }`}
                                >
                                    {Math.round(attendanceRate)}%
                                </span>
                            </div>

                            {/* View Button */}
                            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex justify-center items-center gap-2">
                                <Eye size={16} /> View
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
