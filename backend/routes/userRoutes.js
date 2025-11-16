import express from "express";
import {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// User management
router.route("/")
    .get(getUsers);

router.route("/:id")
    .patch(updateUser)
    .delete(deleteUser);

export default router;
