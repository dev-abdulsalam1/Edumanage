import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["Present", "Absent", "Late", "Excused"],
            required: true,
        },
        remarks: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
