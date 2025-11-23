"use client";

import Loader from "@/components/Loader";
import { useGetSingleClassQuery } from "@/redux/features/classesApi";
import { X, Users, User, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClassProfile() {
    const params = useParams();
    const id = params.id;

    const { data, isLoading } = useGetSingleClassQuery(id);

    if (isLoading) return <Loader />;
    if (!data) return <p className="p-6 text-red-600">Class not found</p>;

    const details = [
        { label: "Class Name", value: data.className },
        { label: "Grade Level", value: data.gradeLevel },
        { label: "Academic Year", value: data.academicYear },
        { label: "Room Name", value: data.roomName },
        { label: "Schedule", value: data.schedule || "Not assigned" },
        { label: "Teacher", value: data.teacher ? `${data.teacher.firstName} ${data.teacher.lastName}` : "No teacher assigned" },
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

            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-2xl border border-green-200 overflow-hidden">
                {/* Top Header */}
                <div className="bg-green-50 p-6 flex items-center gap-6 border-b border-green-100">
                    <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-3xl font-bold text-white">
                        {data.className[0]}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black">{data.className}</h2>
                        <p className="text-black">Grade Level: {data.gradeLevel}</p>
                    </div>

                    <span className="ml-auto px-4 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                        {data.academicYear}
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

                {/* Students Section */}
                <div className="border-t border-green-100 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="text-green-700" /> Students in this Class
                    </h3>

                    {data.students && data.students.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {data.students.map((stu) => (
                                <Link
                                    key={stu._id}
                                    href={`/dashboard/students/${stu._id}`}
                                    className="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                        {stu.firstName[0]}
                                        {stu.lastName[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{stu.firstName} {stu.lastName}</p>
                                        <p className="text-sm text-gray-600">{stu.studentID}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No students assigned to this class.</p>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-green-100 flex justify-end gap-4">
                    <Link href='/dashboard/classes'>
                        <button className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
