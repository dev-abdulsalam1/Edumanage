"use client";

import Loader from "@/components/Loader";
import { useGetClassQuery, useGetSingleClassQuery } from "@/redux/features/classesApi";
import { useGetStudentQuery } from "@/redux/features/studentApi";
import { X, Users, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClassProfile() {
    const params = useParams();
    const id = params.id;

    const { data: cls, isLoading } = useGetSingleClassQuery(id);
    const { data: classes } = useGetClassQuery();
    const { data: students } = useGetStudentQuery();


    if (isLoading) return <Loader />;
    if (!cls) return <p className="p-6 text-red-600">Class not found</p>;

    const studentCount = students?.filter((s) => s.assignedClass === cls._id).length || 0;

    const details = [
        { label: "Class Name", value: cls.className },
        { label: "Grade Level", value: cls.gradeLevel },
        { label: "Academic Year", value: cls.academicYear },
        { label: "Room", value: cls.roomName },
        { label: "Schedule", value: cls.schedule || "-" },
        {
            label: "Assigned Teacher",
            value: cls.teacher
                ? `${cls.teacher.firstName} ${cls.teacher.lastName}`
                : "Not Assigned",
        },
        { label: "Total Students", value: ` ${studentCount} Students ` },
    ];

    return (
        <div className="p-4 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-green-800">Class Profile</h1>
                <Link href={"/dashboard/classes"} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </Link>
            </div>

            {/* Card */}
            <div className="bg-white shadow-lg rounded-2xl border border-green-200 overflow-hidden">

                {/* Top Banner */}
                <div className="bg-green-50 p-6 flex items-center gap-6 border-b border-green-100">
                    <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-3xl font-bold text-white">
                        {cls.className[0]}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black">{cls.className}</h2>
                        <p className="text-black">Room: {cls.roomName}</p>
                    </div>

                    <span className="ml-auto flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        <Users size={18} /> {studentCount} Students
                    </span>
                </div>

                {/* Details */}
                <div className="p-6">
                    <div className="border border-green-100 rounded-xl overflow-hidden">
                        {details.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-between items-center p-4 ${idx % 2 === 0 ? "bg-green-50" : "bg-white"
                                    } border-b border-green-100 hover:bg-green-100 transition`}
                            >
                                <span className="font-semibold text-green-800">{item.label}</span>
                                <span className="text-black">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-green-100 flex justify-end">
                    <Link href="/dashboard/classes">
                        <button className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
