import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: [true, "Class name is required"],
            trim: true,
            unique: true
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            default: null,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],

        academicYear: {
            type: String,
            required: true,
        },
        gradeLevel: {
            type: String,
            required: true,
        },
        roomName: {
            type: String,
            required: true,
            unique: true
        },

        schedule: {
            type: String,
            default: "No schedule set",
        },
    }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
