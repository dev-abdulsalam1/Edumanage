import Teacher from "../models/teacherModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createTeacher = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
});

export const getTeachers = catchAsync(async (req, res, next) => {
    const teachers = await Teacher.find();
    res.json(teachers);
});

export const getTeacherById = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return next(new AppError("Teacher not found", 404));
    res.json(teacher);
});

export const updateTeacher = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return next(new AppError("Teacher not found", 404));
    res.json(teacher);
});

export const deleteTeacher = catchAsync(async (req, res, next) => {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return next(new AppError("Teacher not found", 404));
    res.json({ message: "Teacher deleted successfully" });
});
