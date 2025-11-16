import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        subject: {
            type: String,
            required: true, // e.g., "Mathematics"
        },
        examType: {
            type: String,
            enum: ["Midterm", "Final", "Quiz", "Assignment"],
            required: true,
        },
        marksObtained: {
            type: Number,
            required: true,
        },
        totalMarks: {
            type: Number,
            required: true,
        },
        grade: {
            type: String, // e.g., "A", "B+", "C"
        },
        remarks: {
            type: String,
            default: "",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
