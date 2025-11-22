"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAddClassMutation, useUpdateClassMutation } from "@/redux/features/classesApi";
import { useGetTeacherQuery } from "@/redux/features/teacherApi";
import { useGetStudentQuery } from "@/redux/features/studentApi";
import { toast } from "sonner";

export default function AddClassModal({ isOpen, onClose, classData }) {
    const [formData, setFormData] = useState({
        className: "",
        teacher: "",
        students: [],
        academicYear: "",
        gradeLevel: "",
        roomName: "",
        schedule: "",
    });

    const { data: teachers } = useGetTeacherQuery();
    const { data: students } = useGetStudentQuery();

    const [createClass, { isLoading }] = useAddClassMutation();
    const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "students") {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, students: selected });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Populate form if editing
    useEffect(() => {
        if (classData) {
            setFormData({
                className: classData.className || "",
                teacher: classData.teacher?._id || "",
                academicYear: classData.academicYear || "",
                gradeLevel: classData.gradeLevel || "",
                roomName: classData.roomName || "",
                schedule: classData.schedule || "",
            });
        } else {
            setFormData({
                className: "",
                teacher: "",
                academicYear: "",
                gradeLevel: "",
                roomName: "",
                schedule: "",
            });
        }
    }, [classData, isOpen]);

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (classData) {
                await updateClass({ id: classData._id, ...formData }).unwrap();
                toast.success("Class updated successfully!");
            } else {
                await createClass(formData).unwrap();
                toast.success("Class created successfully!");
            }
            onClose();
        } catch (err) {
            toast.error("Operation failed", { description: err.message });
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-10 flex justify-center items-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-[500px] relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        {classData ? "Edit Class" : "Add New Class"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            name="className"
                            placeholder="Class Name (e.g., Grade 7A)"
                            value={formData.className}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />

                        {/* Teacher Select */}
                        <select
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        >
                            <option value="">Select Teacher</option>
                            {teachers?.map((t) => (
                                <option key={t._id} value={t._id}>
                                    {t.firstName} {t.lastName}
                                </option>
                            ))}
                        </select>

                        <input
                            name="gradeLevel"
                            placeholder="Grade Level (e.g., Grade 7)"
                            value={formData.gradeLevel}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />

                        <input
                            name="academicYear"
                            placeholder="Academic Year (e.g., 2024-2025)"
                            value={formData.academicYear}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />

                        <input
                            name="roomName"
                            placeholder="Room Name (e.g., Room A1)"
                            value={formData.roomName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />

                        <input
                            name="schedule"
                            placeholder="Schedule (e.g., Mon–Thu | 7:30 AM – 12:00 PM)"
                            value={formData.schedule}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />

                        <button
                            type="submit"
                            disabled={isLoading || isUpdating}
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-all disabled:opacity-60"
                        >
                            {classData
                                ? (isUpdating ? "Updating..." : "Update Class")
                                : (isLoading ? "Saving..." : "Create Class")}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
}
