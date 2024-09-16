import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllCourses = TryCatch(async (request, response) => {
    const courses = await Courses.find();

    response.json({
        courses
    });
});

/**
 * Trả về khóa học theo id khóa học
 */
export const getSingleCourse = TryCatch(async (request, response) => {
    const course = await Courses.findById(request.params.id);

    response.json({
        course
    })
});

/**
 * Trả về tất cả các bài giảng trong 1 khóa học
 */
export const fetchLectures = TryCatch(async (request, response) => {
    const lectures = await Lecture.find({ course: request.params.id });

    const user = await User.findById(request.user._id);

    if (user.role === "admin") {
        return response.json({
            lectures
        });
    }

    if (!user.subscription.includes(request.params.id)) {
        return response.status(400).json({
            message: "You have not subscribed to this course"
        });
    }

    response.json({
        lectures
    });
});

/**
 * Lấy ra một bài giảng cụ thể
 */
export const fetchLecture = TryCatch(async(request, response) => {
    const lecture = await Lecture.findById(request.params.id);

    const user = await User.findById(request.user._id);

    if (user.role === "admin") {
        return response.json({
            lecture
        });
    }

    if (!user.subscription.includes(request.params.id)) {
        return response.status(400).json({
            message: "You have not subscribed to this course"
        });
    }

    response.json({
        lecture
    });
});