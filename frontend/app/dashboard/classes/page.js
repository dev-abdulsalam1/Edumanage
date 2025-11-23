"use client";

import { useState } from "react";
import { Plus, Users, CalendarDays, User } from "lucide-react";
import { useDeleteClassMutation, useGetClassQuery } from "@/redux/features/classesApi";
import AddClassModal from "./AddClassModal"; // adjust path
import { useGetStudentQuery } from "@/redux/features/studentApi";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "@/components/Loader";
import FetchError from "@/components/FetchError";

export default function ClassesPage() {
    const { data: students } = useGetStudentQuery();
    const { data: classes, isError, isLoading, refetch } = useGetClassQuery();
    const [deleteClass] = useDeleteClassMutation()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);


    const handleDelete = async (id) => {
        try {
            await deleteClass(id);
            toast.success("Class deleted", {
                description: "The record was removed successfully.",
            });
        } catch (err) {
            toast.error("Deletion failed", {
                description: "An error occurred while deleting the Class.",
            });
        }
    };
    const handleOpenModal = (cls = null) => {
        setEditingClass(cls); // if cls is passed, it will edit
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingClass(null);
        setIsModalOpen(false);
    };

    if (isLoading) return <Loader />;
    if (isError)
        return <FetchError refetch={refetch} message="⚠️ Error loading Classes!" />;

    return (
        <div className="p-6">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Classes Dashboard</h1>
                    <p className="text-gray-500">Manage all classes, teachers, and sections</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-green-700 text-white rounded-xl flex items-center gap-2 hover:bg-green-800 transition"
                >
                    <Plus size={18} />
                    Add Class
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes?.map((cls) => (
                    <div
                        key={cls._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition cursor-default"
                    >
                        {/* Class Title */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{cls.className}</h2>
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
                            <span className="font-medium">
                                {cls.teacher?.firstName ? `${cls.teacher.firstName} ${cls.teacher.lastName}` : "No Teacher Assigned"}
                            </span>
                        </div>

                        {/* Students */}
                        <div className="mt-2 flex items-center gap-2 text-gray-700">
                            <Users size={18} className="text-green-600" />
                            <span>{students?.filter((s) => s.assignedClass === cls._id).length} Students</span>
                        </div>

                        {/* Schedule */}
                        <div className="mt-2 flex items-center gap-2 text-gray-700">
                            <CalendarDays size={18} className="text-purple-600" />
                            <span>{cls.schedule || "No schedule set"}</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-6">
                            <Link href={`/dashboard/classes/${cls._id}`}>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                    View
                                </button>
                            </Link>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(cls)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cls._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            <AddClassModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                classData={editingClass}
            />
        </div>
    );
}
