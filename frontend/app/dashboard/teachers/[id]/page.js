"use client";

import Loader from "@/components/Loader";
import { useGetSingleTeacherQuery } from "@/redux/features/teacherApi";
import { X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
// import EditTeacherModal from "../EditTeacherModal";

export default function TeacherProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const id = params.id;

    const { data, isLoading } = useGetSingleTeacherQuery(id);

    if (isLoading) return <Loader />;
    if (!data) return <p className="p-6 text-red-600">Teacher not found</p>;

    const details = [
        { label: "Teacher ID", value: data.teacherID },
        { label: "Gender", value: data.gender },
        { label: "Phone", value: data.phone || "-" },
        { label: "Email", value: data.email || "-" },
        { label: "Subject", value: data.subject },
        { label: "Qualification", value: data.qualification },
        { label: "Experience (Years)", value: data.experience },
        { label: "Hire Date", value: new Date(data.hireDate).toLocaleDateString() },
    ];

    return (
        <div className="p-4 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">Teacher Profile</h1>
                <Link href={"/dashboard/teachers"} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </Link>
            </div>

            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-2xl border border-green-200 overflow-hidden">
                {/* Top Section */}
                <div className="bg-green-50 p-6 flex items-center gap-6 border-b border-green-100">
                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-3xl font-bold text-white">
                        {data.firstName[0]}
                        {data.lastName[0]}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-black">
                            {data.firstName} {data.lastName}
                        </h2>
                        <p className="text-black">Subject: {data.subject}</p>
                        <p className="text-black">Qualification: {data.qualification}</p>
                    </div>
                    <span
                        className={`ml-auto px-4 py-1 rounded-full text-sm font-medium ${data.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                    >
                        {data.isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                {/* Details Table */}
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

                {/* Footer Actions */}
                <div className="p-6 border-t border-green-100 flex justify-end gap-4">
                    <Link href='/dashboard/teachers'>
                        <button className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
