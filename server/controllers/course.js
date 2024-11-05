import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";
import axios from "axios";

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
export const fetchLecture = TryCatch(async (request, response) => {
    const lecture = await Lecture.findById(request.params.id);

    const user = await User.findById(request.user._id);

    if (user.role === "admin") {
        return response.json({
            lecture
        });
    }

    if (!user.subscription.includes(lecture.course)) {
        return response.status(400).json({
            message: "You have not subscribed to this course"
        });
    }

    response.json({
        lecture
    });
});

export const getMyCourses = TryCatch(async (request, response) => {
    const courses = await Courses.find({ _id: request.user.subscription });

    response.json({
        courses
    });
});

export const checkout = TryCatch(async (request, response) => {
    const user = await User.findById(request.user._id);

    const course = await Courses.findById(request.params.id);

    if (user.subscription.includes(course._id)) {
        return response.status(400).json({
            message: "You already have this course"
        })
    }

    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var accessKey = process.env.MOMO_ACCESS_KEY;
    var secretKey = process.env.MOMO_SECRET_KEY;
    var orderId = partnerCode + new Date().getTime();
    var redirectUrl = process.env.MOMO_REDIRECT_URL;
    var ipnUrl = process.env.MOMO_RETURN_URL;
    var requestType = "payWithMethod";
    var amount = course.price.toString();
    var requestId = orderId;
    var extraData = request.params.id;
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    var rawSignature = "accessKey=" + accessKey
        + "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + orderId +
        "&orderInfo=" + orderInfo +
        "&partnerCode=" + partnerCode +
        "&redirectUrl=" + redirectUrl +
        "&requestId=" + requestId +
        "&requestType=" + requestType;
    //signature
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody)
        },
        data: requestBody
    }

    let result;
    try {
        result = await axios(options);
        return response.status(200).json(
            result.data
        );
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: "Server error"
        })
    }
});

export const callback = TryCatch(async (request, response) => {
    console.log("callback")
    console.log(request.body);
    return response.status(200).json(request.body)
})

export const paymentVerification = TryCatch(async (request, response) => {
    const { orderId, amount, courseId } = request.body;

    var accessKey = process.env.MOMO_ACCESS_KEY;
    var secretKey = process.env.MOMO_SECRET_KEY;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

    const requestBody = JSON.stringify({
        partnerCode: "MOMO",
        requestId: orderId,
        orderId,
        signature,
        lang: "vi"
    })

    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/query",
        headers: {
            "Content-type": "application/json"
        },
        data: requestBody
    }

    let result = await axios(options);

    if (result.data.resultCode === 0) {
        await Payment.create({
            orderId: orderId,
            amount: amount
        });

        const user = await User.findById(request.user._id);
        const course = await Courses.findById(courseId);
        user.subscription.push(course._id);

        await user.save();

        response.status(200).json({
            message: "Course Purchased Successfully"
        });
    } else {
        return response.status(400).json({
            message: "Payment failed"
        })
    }
})