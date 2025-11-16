import Attendance from "../models/attendanceModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const markAttendance = catchAsync(async (req, res, next) => {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
});

export const getAttendances = catchAsync(async (req, res, next) => {
    const attendances = await Attendance.find().populate("student").populate("class");
    res.json(attendances);
});

export const getAttendanceById = catchAsync(async (req, res, next) => {
    const attendance = await Attendance.findById(req.params.id).populate("student").populate("class");
    if (!attendance) return next(new AppError("Attendance not found", 404));
    res.json(attendance);
});

export const updateAttendance = catchAsync(async (req, res, next) => {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return next(new AppError("Attendance not found", 404));
    res.json(updated);
});

export const deleteAttendance = catchAsync(async (req, res, next) => {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new AppError("Attendance not found", 404));
    res.json({ message: "Attendance deleted successfully" });
});
