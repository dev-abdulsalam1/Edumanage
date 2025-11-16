"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAddStudentMutation, useUpdateStudentMutation } from "@/redux/features/studentApi";
import { toast } from "sonner";

export default function AddStudentModal({ isOpen, onClose, student }) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "Male",
        grade: "",
        phone: "",
        parentName: "",
        parentContact: "",
    });

    const [createStudent, { isLoading }] = useAddStudentMutation();
    const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Update form when "student" prop changes (for editing)
    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.firstName || "",
                lastName: student.lastName || "",
                gender: student.gender || "Male",
                grade: student.grade || "",
                phone: student.phone || "",
                parentName: student.parentName || "",
                parentContact: student.parentContact || "",
            });
        } else {
            // Reset form if no student (for creating new)
            setFormData({
                firstName: "",
                lastName: "",
                gender: "Male",
                grade: "",
                phone: "",
                parentName: "",
                parentContact: "",
            });
        }
    }, [student, isOpen]); // run when student changes or modal opens

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (student) {
                // Update existing student
                await updateStudent({
                    id: student._id,
                    ...formData   // 🔥 unwrap body
                }).unwrap();
                toast.success("Student updated", { description: "✅ Updated successfully!" });
            } else {
                // Create new student
                await createStudent(formData).unwrap();
                toast.success("Student created", { description: "✅ Created successfully!" });
            }
            onClose();
        } catch (err) {
            toast.error("Operation failed", { description: "❌ Something went wrong!" });
        }
    };

    return (
        <div>
            {isOpen && (<div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-10 flex justify-center items-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-[500px] relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Add New Student
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-1/2 border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                            <input
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-1/2 border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />

                        </div>

                        <div className="flex gap-2">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-1/2 border p-2 rounded-md"
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        <input
                            name="grade"
                            placeholder="Grade (e.g., Grade 9)"
                            value={formData.grade}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />

                        <input
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />

                        <input
                            name="parentName"
                            placeholder="Parent Name"
                            value={formData.parentName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />

                        <input
                            name="parentContact"
                            placeholder="Parent Contact"
                            value={formData.parentContact}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-all disabled:opacity-60"
                        >
                            {student
                                ? (isUpdating ? "Updating..." : "Update Student")
                                : (isLoading ? "Saving..." : "Create Student")}
                        </button>
                    </form>
                </div>
            </div>)}
        </div>
    );
}
