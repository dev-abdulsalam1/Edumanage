"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react"; // modal
import { X } from "lucide-react";
import { useUpdateTeacherMutation } from "@/redux/features/teacherApi";
import { toast } from "sonner";

export default function EditTeacherModal({ isOpen, onClose, teacher }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "Male",
        phone: "",
        email: "",
        subject: "",
        qualification: "",
        experience: 0,
    });

    const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();

    useEffect(() => {
        if (teacher) {
            setFormData({
                firstName: teacher.firstName || "",
                lastName: teacher.lastName || "",
                gender: teacher.gender || "Male",
                phone: teacher.phone || "",
                email: teacher.email || "",
                subject: teacher.subject || "",
                qualification: teacher.qualification || "",
                experience: teacher.experience || 0,
            });
        }
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTeacher({ id: teacher._id, ...formData }).unwrap();
            toast.success("Teacher updated successfully!");
            onClose();
        } catch (err) {
            toast.error("Failed to update teacher.");
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg z-50 p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>

                <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">Edit Teacher</Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Qualification</label>
                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Experience (Years)</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
