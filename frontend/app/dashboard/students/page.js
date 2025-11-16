"use client";

import React, { useState } from "react";
import { Search, Eye, Edit, Trash2, Filter, AlertTriangle } from "lucide-react";
import { useDeleteStudentMutation, useGetStudentQuery, useUpdateStudentMutation } from "@/redux/features/studentApi";
import AddStudentModal from "./AddStudentModal";
import Loader from "@/components/Loader";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { toast } from 'sonner'



function ErrorMessage({ message = "Something went wrong!" }) {
    return (
        <div className="flex flex-col items-center justify-center mt-10 text-red-600">
            <AlertTriangle className="w-6 h-6 mb-2" />
            <p className="text-center font-medium">{message}</p>
        </div>
    );
}

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: students, isLoading, isError } = useGetStudentQuery();
    const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
    const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);


    const statusStyles = {
        Active: "bg-green-100 text-green-700",
        Graduated: "bg-purple-100 text-purple-700",
        Inactive: "bg-red-100 text-red-700",
    };


    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage message="⚠️ Error loading students!" />



    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            toast.success("Student deleted", {
                description: "The record was removed successfully.",
                style: {
                    background: "#fff", // purple
                    color: "#4ade80",
                    border: "1px solid #4ade80",
                },
            });
        } catch (err) {
            toast.error("Deletion failed", {
                description: "An error occurred while deleting the student.",
            });
        }
    };
    return (
        <div className="p-6 h-full">
            {/* Page Title + Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Students</h1>
                    <p className="text-gray-500">Manage student records and profiles</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 sm:mt-0 bg-green-700 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition-all"
                >
                    + New Student
                </button>
            </div>
            {/* Modal Component */}
            <AddStudentModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingStudent(null); // reset after closing
                }}
                student={editingStudent}
            />

            {/* Search + Filter Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative flex-1 sm:max-w-sm">
                    <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search students by name or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-300 transition">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <caption className="text-left text-2xl font-bold text-gray-600 p-4">
                        List of all students in the school
                    </caption>
                    <thead className="bg-gray-100 font-bold">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.studentID} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-3 font-medium">{student.firstName} {student.lastName}</td>
                                    <td className="px-6 py-3">{student.studentID}</td>
                                    <td className="px-6 py-3">{student.grade}</td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[student.status] || "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {student.status || "Unknown"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">{student.gender}</td>
                                    <td className="px-6 py-3 text-center flex justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setEditingStudent(student); // pass selected student
                                            }}
                                            className="text-yellow-600 hover:text-yellow-800">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <DeleteConfirmModal onConfirm={() => handleDelete(student._id)}  >
                                            <button

                                                className="text-red-600 hover:text-red-800">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </DeleteConfirmModal>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">
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
