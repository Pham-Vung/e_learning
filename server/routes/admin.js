import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
    addLectures,
    createCourse,
    deleteCourse,
    deleteLecture,
    getAllStatus,
    getAllUser,
    updateRole,
    deteteUser,
} from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
// router.put("/lecture/:id", isAuth, isAdmin, updateLecture);
router.get("/status", isAuth, isAdmin, getAllStatus);
router.put("/user/:id", isAuth, updateRole);
router.get("/users", isAuth, isAdmin, getAllUser);
router.delete("/user/:id", isAuth, isAdmin, deteteUser);

export default router;