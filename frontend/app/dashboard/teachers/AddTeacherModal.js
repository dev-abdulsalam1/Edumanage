"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
    useAddTeacherMutation,
    useDeleteTeacherMutation,
} from "../../../redux/features/teacherApi";

export default function AddTeacherModal({ isOpen, onClose, teacher }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "Male",
        email: "",
        phone: "",
        subject: "",
        qualification: "",
        experience: 0,
        isActive: true,
    });

    const [createTeacher, { isLoading }] = useAddTeacherMutation();
    const [updateTeacher, { isLoading: isUpdating }] = useDeleteTeacherMutation();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Load teacher data when editing
    useEffect(() => {
        if (teacher) {
            setFormData({
                firstName: teacher.firstName || "",
                lastName: teacher.lastName || "",
                gender: teacher.gender || "Male",
                email: teacher.email || "",
                phone: teacher.phone || "",
                subject: teacher.subject || "",
                qualification: teacher.qualification || "",
                experience: teacher.experience || 0,
                isActive: teacher.isActive ?? true,
            });
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                gender: "Male",
                email: "",
                phone: "",
                subject: "",
                qualification: "",
                experience: 0,
                isActive: true,
            });
        }
    }, [teacher, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (teacher) {
                await updateTeacher({
                    id: teacher._id,
                    body: formData,
                }).unwrap();

                toast.success("Teacher updated successfully");
            } else {
                await createTeacher(formData).unwrap();
                toast.success("Teacher created successfully");
            }

            onClose();
        } catch (error) {
            toast.error("Failed!", {
                description: error?.data?.message || "Something went wrong",
            });
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:w-[500px] relative">

                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {teacher ? "Edit Teacher" : "Add New Teacher"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-3">

                            <div className="flex gap-2">
                                <input
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-1/2 border p-2 rounded-md"
                                    required
                                />
                                <input
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-1/2 border p-2 rounded-md"
                                    required
                                />
                            </div>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <input
                                name="email"
                                placeholder="Email"
                                value={formData.email}
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
                                required
                            />

                            <input
                                name="subject"
                                placeholder="Subject Specialization"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                                required
                            />

                            <input
                                name="qualification"
                                placeholder="Qualification (e.g., B.Ed, M.Ed)"
                                value={formData.qualification}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                                required
                            />

                            <input
                                name="experience"
                                type="number"
                                placeholder="Experience (years)"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md"
                            />

                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                                Active Teacher
                            </label>

                            <button
                                type="submit"
                                disabled={isLoading || isUpdating}
                                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 disabled:opacity-60"
                            >
                                {teacher
                                    ? isUpdating ? "Updating..." : "Update Teacher"
                                    : isLoading ? "Saving..." : "Create Teacher"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
