import express from "express";
import {
    createResult,
    getResults,
    getResultById,
    updateResult,
    deleteResult
} from "../controllers/resultController.js";

const router = express.Router();

router.route("/")
    .post(createResult)
    .get(getResults);

router.route("/:id")
    .get(getResultById)
    .patch(updateResult)
    .delete(deleteResult);

export default router;
