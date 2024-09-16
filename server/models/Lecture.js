import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    course: {// bài giảng thuộc khóa học nào
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

export const Lecture = mongoose.model("Lecture", schema);