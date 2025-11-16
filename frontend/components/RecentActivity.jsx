"use client";

import React from "react";
import { Bell, UserPlus, GraduationCap, ClipboardList, Clock } from "lucide-react";

export default function RecentActivity() {
    const activities = [
        {
            id: 1,
            icon: <UserPlus className="w-5 h-5 text-green-500" />,
            title: "New Student Registered",
            description: "Ali Hussein joined Grade 10 - A",
            time: "2 hours ago",
        },
        {
            id: 2,
            icon: <GraduationCap className="w-5 h-5 text-blue-500" />,
            title: "New Teacher Added",
            description: "Mr. Mohamed joined the Science Department",
            time: "5 hours ago",
        },
        {
            id: 3,
            icon: <ClipboardList className="w-5 h-5 text-yellow-500" />,
            title: "Attendance Submitted",
            description: "Class 8-B marked complete for today",
            time: "Yesterday",
        },
        {
            id: 4,
            icon: <Bell className="w-5 h-5 text-red-500" />,
            title: "Exam Reminder",
            description: "Math midterm scheduled for next Monday",
            time: "2 days ago",
        },
    ];

    return (
        <div className="p-6 bg-gray-50">
            {/* Page title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Recent Activity</h1>
                <hr />
            {/* Activity list */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-start gap-4 border-b last:border-none pb-4 last:pb-0 hover:bg-gray-50 rounded-lg transition"
                    >
                        <div className="p-2 bg-gray-100 rounded-full">{activity.icon}</div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                            <p className="text-gray-500 text-sm">{activity.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
