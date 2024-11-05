import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs"; // để xóa một tệp hoặc thư mục
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";

export const createCourse = TryCatch(async (request, response) => {
    const { title, description, category, createdBy, duration, price } = request.body;

    const image = request.file;

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price,
    });

    response.status(201).json({
        message: "Course created successfully"
    });
});

export const addLectures = TryCatch(async (request, response) => {
    const course = await Courses.findById(request.params.id);

    if (!course) {
        return response.status(404).json({
            message: "No course with this id"
        });
    }

    const { title, description } = request.body;

    const file = request.file;

    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id
    });

    response.status(201).json({
        message: "Lecture added",
        lecture
    })
});

export const deleteLecture = TryCatch(async (request, response) => {
    const lecture = await Lecture.findById(request.params.id);

    rm(lecture.video, () => {
        console.log("Video deleted");
    });

    await lecture.deleteOne();

    response.json({
        message: "Lecture deleted"
    });
});

// Biến một hàm callback-based thành một hàm Promise.
// Ở đây, nó biến hàm fs.unlink (xóa file) thành một hàm có thể sử dụng với async/await
const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (request, response) => {
    const course = await Courses.findById(request.params.id);

    // tìm tất cả bài giảng trong khóa học
    const lectures = await Lecture.find({ course: course._id });

    // dùng Promise.all chạy song song việc xóa video của các bài giảng
    await Promise.all(
        lectures.map(async (lecture) => {
            await unlinkAsync(lecture.video);
            console.log("video deleted");
        })
    );

    // Xóa hình ảnh khóa học
    rm(course.image, () => {
        console.log("Image deleted");// callback sau khi ảnh được xóa
    });

    // xóa tất cả bài giảng có trong khóa học
    await Lecture.find({ course: request.params.id }).deleteMany();

    await course.deleteOne();

    // xóa id khóa học khỏi subscription của tất cả người dùng.
    await User.updateMany({}, { $pull: { subscription: request.params.id } });

    response.json({
        message: "Course deleted"
    });
});

export const getAllStatus = TryCatch(async (request, response) => {
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const status = {
        totalCourses,
        totalLectures,
        totalUsers
    };

    response.json({
        status
    });
});

export const getAllUser = TryCatch(async (request, response) => {
    const users = await User.find({ _id: { $ne: request.user._id } }).select(
        "-password"
    );

    response.json({ users });
});

export const updateRole = TryCatch(async (request, response) => {
    const user = await User.findById(request.params.id);

    if (user.role === 'user') {
        user.role = 'admin';
        await user.save();

        return response.status(200).json({
            message: "Role updated to admin"
        });
    }

    if (user.role === 'admin') {
        user.role = 'user';
        await user.save();

        return response.status(200).json({
            message: "Role updated"
        });
    }

})