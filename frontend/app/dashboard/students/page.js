"use client";

import React, { useState } from "react";
import { Search, Edit, Trash2, Filter, Eye } from "lucide-react";
import Link from "next/link"; // ✅ Correct Link import
import {
    useDeleteStudentMutation,
    useGetStudentQuery,
} from "@/redux/features/studentApi";
import AddStudentModal from "./AddStudentModal";
import Loader from "@/components/Loader";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { toast } from "sonner";
import FetchError from "@/components/FetchError";

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: students, isLoading, isError, refetch } = useGetStudentQuery();
    const [deleteStudent] = useDeleteStudentMutation();
    const { data: classes } = useGetStudentQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const statusStyles = {
        Active: "bg-green-100 text-green-700",
        Graduated: "bg-purple-100 text-purple-700",
        Inactive: "bg-red-100 text-red-700",
    };

    if (isLoading) return <Loader />;
    if (isError)
        return <FetchError refetch={refetch} message="⚠️ Error loading students!" />;

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            toast.success("Student deleted", {
                description: "The record was removed successfully.",
            });
        } catch (err) {
            toast.error("Deletion failed", {
                description: "An error occurred while deleting the student.",
            });
        }
    };

    // Optional: filter students by search query
    const filteredStudents = students?.filter(
        (student) =>
            student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.studentID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 h-full">
            {/* Page Title + Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Students
                    </h1>
                    <p className="text-gray-500">Manage student records and profiles</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition-all w-full sm:w-auto"
                >
                    + New Student
                </button>
            </div>

            {/* Modal */}
            <AddStudentModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingStudent(null);
                }}
                student={editingStudent}
            />

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search students by name or ID..."
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
                        List of all students in the school
                    </caption>

                    <thead className="bg-gray-100 hidden sm:table-header-group">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Student ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Grade
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Gender
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 sm:table-row-group">
                        {filteredStudents?.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr
                                    key={student._id}
                                    className="hover:bg-gray-50 transition block sm:table-row p-4 sm:p-0"
                                >
                                    <td className="px-6 py-3 font-medium block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">Name: </span>
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Circle */}
                                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                                                {student.firstName[0]}
                                                {student.lastName[0]}
                                            </div>
                                            {/* Full Name */}
                                            <span>{student.firstName} {student.lastName}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">
                                            ID:{" "}
                                        </span>
                                        {student.studentID}
                                    </td>

                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">
                                            Grade:{" "}
                                        </span>
                                        {student.grade}
                                    </td>

                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">
                                            Status:{" "}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[student.status] || "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {student.status || "Unknown"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-3 block sm:table-cell">
                                        <span className="sm:hidden font-semibold text-gray-500">
                                            Gender:{" "}
                                        </span>
                                        {student.gender}
                                    </td>

                                    <td className="px-6 py-3 space-x-3 text-center flex sm:block justify-center gap-3">
                                        <button>
                                            <Link
                                                href={`/dashboard/students/${student._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingStudent(student);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>

                                        <DeleteConfirmModal
                                            onConfirm={() => handleDelete(student._id)}
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
                                <td
                                    colSpan={6}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
