import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.route("/")
  .post(createStudent)     // Create a student
  .get(getStudents);       // Get all students

router.route("/:id")
  .get(getStudentById)     // Get single student
  .patch(updateStudent)    // Update student
  .delete(deleteStudent);  // Delete student

export default router;
