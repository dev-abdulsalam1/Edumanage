import Student from "../models/studentModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createStudent = catchAsync(async (req, res, next) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

export const getStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find();
    res.json(students);
});

export const getStudentById = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (!student) return next(new AppError("Student not found", 404));
    res.json(student);
});

export const updateStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return next(new AppError("Student not found", 404));
    res.json(student);
});

export const deleteStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return next(new AppError("Student not found", 404));
    res.json({ message: "Student deleted successfully" });
});
