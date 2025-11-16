import express from "express";
import {
    markAttendance,
    getAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} from "../controllers/attendanceController.js";

const router = express.Router();

router.route("/")
    .post(markAttendance)
    .get(getAttendances);

router.route("/:id")
    .get(getAttendanceById)
    .patch(updateAttendance)
    .delete(deleteAttendance);

export default router;
