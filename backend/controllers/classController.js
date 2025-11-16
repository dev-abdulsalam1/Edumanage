import Class from "../models/classModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createClass = catchAsync(async (req, res, next) => {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
});

export const getClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find().populate("teacher").populate("students");
    res.json(classes);
});

export const getClassById = catchAsync(async (req, res, next) => {
    const singleClass = await Class.findById(req.params.id).populate("teacher").populate("students");
    if (!singleClass) return next(new AppError("Class not found", 404));
    res.json(singleClass);
});

export const updateClass = catchAsync(async (req, res, next) => {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return next(new AppError("Class not found", 404));
    res.json(updatedClass);
});

export const deleteClass = catchAsync(async (req, res, next) => {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return next(new AppError("Class not found", 404));
    res.json({ message: "Class deleted successfully" });
});
