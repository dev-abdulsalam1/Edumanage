import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: [true, "Class name is required"], // e.g., "Grade 8A"
            trim: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher", // references the Teacher model
            required: [true, "Class teacher is required"],
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student", // references the Student model
            },
        ],
        academicYear: {
            type: String,
            required: true, // e.g., "2024–2025"
        },
        gradeLevel: {
            type: String, // e.g., "Grade 8" or "Form 2"
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

const Class = mongoose.model("Class", classSchema);

export default Class;