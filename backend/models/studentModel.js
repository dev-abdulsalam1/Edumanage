import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "full name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "full name is required"],
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        studentID: {
            type: String,
            unique: true,
        },
        grade: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        parentName: {
            type: String,
        },
        parentContact: {
            type: String,
        },
        enrollmentDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["Active", "Graduated", "Inactive"],
            default: "Active",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

studentSchema.pre("save", function (next) {
    if (!this.studentID) {
        this.studentID = `STU${Math.floor(1000 + Math.random() * 9000)}`; // e.g., STU4567
    }
    next();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
