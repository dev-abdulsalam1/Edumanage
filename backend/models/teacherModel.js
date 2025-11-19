import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Email is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        teacherID: {
            type: String,
            unique: true,
        },
        subject: {
            type: String,
            required: [true, "Subject specialization is required"],
        },
        qualification: {
            type: String,
            required: [true, "Qualification is required"],
        },
        experience: {
            type: Number, // in years
            default: 0,
        },
        hireDate: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

teacherSchema.pre("save", function (next) {
    if (!this.teacherID) {
        this.teacherID = `TECH${Math.floor(1000 + Math.random() * 9000)}`; // e.g., TECH4567
    }
    next();
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
