"use client";

import React, { useState } from "react";
import { Search, Edit, Trash2, Filter, Eye } from "lucide-react";
import {
    useGetTeacherQuery,
    useDeleteTeacherMutation
} from "@/redux/features/teacherApi";

import AddTeacherModal from "./AddTeacherModal";
import Loader from "@/components/Loader";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { toast } from "sonner";
import FetchError from "@/components/FetchError";
import Link from "next/link";

export default function TeachersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: teachers, isLoading, isError, refetch } = useGetTeacherQuery();
    const [deleteTeacher] = useDeleteTeacherMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);

    if (isLoading) return <Loader />;
    if (isError)
        return <FetchError refetch={refetch} message="⚠️ Error loading teachers!" />;

    const handleDelete = async (id) => {
        try {
            await deleteTeacher(id).unwrap();
            toast.success("Teacher deleted successfully");
        } catch (err) {
            toast.error("Failed to delete teacher");
        }
    };

    // Search Filter
    const filteredTeachers = teachers?.filter((t) =>
        `${t.firstName} ${t.lastName} ${t.teacherID}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 h-full">

            {/* Page Title + Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Teachers
                    </h1>
                    <p className="text-gray-500">Manage teacher records & assignments</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition-all w-full sm:w-auto"
                >
                    + New Teacher
                </button>
            </div>

            {/* Modal */}
            <AddTeacherModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTeacher(null);
                }}
                teacher={editingTeacher}
            />

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search teacher by name or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-300 transition w-full sm:w-auto justify-center">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="min-w-full">
                    <caption className="text-left text-xl sm:text-2xl font-bold text-gray-600 p-4">
                        List of all teachers
                    </caption>

                    <thead className="bg-gray-100 hidden sm:table-header-group">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teacher ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Experience</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 sm:table-row-group">
                        {filteredTeachers?.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <tr
                                    key={teacher._id}
                                    className="hover:bg-gray-50 transition block sm:table-row p-4 sm:p-0"
                                >
                                    <td className="px-6 py-3 font-medium block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">Name: </span>
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Circle */}
                                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                                                {teacher.firstName[0]}
                                                {teacher.lastName[0]}
                                            </div>
                                            {/* Full Name */}
                                            <span>{teacher.firstName} {teacher.lastName}</span>
                                        </div>
                                    </td>

                                    {/* Teacher ID */}
                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">ID: </span>
                                        {teacher.teacherID}
                                    </td>

                                    {/* Subject */}
                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">Subject: </span>
                                        {teacher.subject}
                                    </td>

                                    {/* Experience */}
                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">Experience: </span>
                                        {teacher.experience} years
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">Email: </span>
                                        {teacher.email}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-3 space-x-3 text-center flex sm:block justify-center gap-3">
                                        <button>
                                            <Link
                                                href={`/dashboard/teachers/${teacher._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </button>
                                        {/* EDIT BUTTON */}
                                        <button
                                            onClick={() => {
                                                setEditingTeacher(teacher);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>

                                        {/* DELETE BUTTON */}
                                        <DeleteConfirmModal
                                            onConfirm={() => handleDelete(teacher._id)}
                                        >
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </DeleteConfirmModal>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">
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
