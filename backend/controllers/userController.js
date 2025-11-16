import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = catchAsync(async (req, res, next) => {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: "User registered successfully", user });
});

// Login user
export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "7d" }
    );

    res.json({ token, user });
});

// Get all users
export const getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.json(users);
});

// Update user
export const updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return next(new AppError("User not found", 404));
    res.json(user);
});

// Delete user
export const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError("User not found", 404));
    res.json({ message: "User deleted successfully" });
});
