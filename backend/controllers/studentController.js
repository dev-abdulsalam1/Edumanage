import Student from "../models/studentModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createStudent = catchAsync(async (req, res, next) => {
    let  student = await Student.create(req.body);
    // Re-fetch with populate
    student = await Student.findById(student._id).populate("grade");
    res.status(201).json(student);
});

export const getStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find().populate("grade", "className");
    res.json(students);
});

export const getStudentById = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id).populate("grade", "className");
    if (!student) return next(new AppError("Student not found", 404));
    res.json(student);
});

export const updateStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("grade", "className");;
    if (!student) return next(new AppError("Student not found", 404));
    res.json(student);
});

export const deleteStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return next(new AppError("Student not found", 404));
    res.json({ message: "Student deleted successfully" });
});
