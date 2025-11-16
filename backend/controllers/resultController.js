import Result from "../models/resultModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createResult = catchAsync(async (req, res, next) => {
    const result = await Result.create(req.body);
    res.status(201).json(result);
});

export const getResults = catchAsync(async (req, res, next) => {
    const results = await Result.find().populate("student").populate("class");
    res.json(results);
});

export const getResultById = catchAsync(async (req, res, next) => {
    const result = await Result.findById(req.params.id).populate("student").populate("class");
    if (!result) return next(new AppError("Result not found", 404));
    res.json(result);
});

export const updateResult = catchAsync(async (req, res, next) => {
    const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return next(new AppError("Result not found", 404));
    res.json(updated);
});

export const deleteResult = catchAsync(async (req, res, next) => {
    const deleted = await Result.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new AppError("Result not found", 404));
    res.json({ message: "Result deleted successfully" });
});
