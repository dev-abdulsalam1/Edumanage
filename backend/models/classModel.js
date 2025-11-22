import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: [true, "Class name is required"],
            trim: true,
            unique: true
        },
        // if you want to reference a teacher
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            default: null,
        },
        //  reference actual students
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

        // UI expects schedule string
        schedule: {
            type: String,
            default: "No schedule set",
        },
    },
);

classSchema.index({ className: 1 }, { unique: true });
classSchema.index({ roomName: 1 }, { unique: true });

const Class = mongoose.model("Class", classSchema);

export default Class;
