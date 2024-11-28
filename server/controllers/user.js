import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Blogs } from "../models/Blogs.js";

export const register = TryCatch(async (request, response) => {
    const { email, name, password } = request.body;

    let user = await User.findOne({ email });

    if (user) {
        return response.status(400).json({
            message: "User already exists"
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
        name,
        email,
        password: hashPassword
    };
    const otp = Math.floor(Math.random() * 1000000);

    const activationToken = jwt.sign(
        {
            user,
            otp
        },
        process.env.Activation_Secret,
        {
            expiresIn: "5m" // hết hạn sau 5 phút
        }
    );

    const data = {
        name,
        otp
    };

    await sendMail(
        email,
        "E learning",
        data
    );

    response.status(200).json({
        message: "Otp send to your email",
        activationToken,
    });
});

/**
 * Xác minh OTP để đăng ký tài khoản
 */

export const verifyUser = TryCatch(async (request, response) => {
    const { otp, activationToken } = request.body;

    const verify = jwt.verify(activationToken, process.env.Activation_Secret);

    //kiểm tra thời hạn token
    if (!verify) {
        return response.status(400).json({
            message: "Otp expired"
        });
    }

    // sai token
    if (verify.otp !== otp) {
        return response.status(400).json({
            message: "Wrong Otp"
        });
    }

    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password
    });

    response.json({
        message: "User registered"
    });
});

export const loginUser = TryCatch(async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
        return response.status(400).json({
            message: "No User with this email"
        });
    }

    const mathPassword = await bcrypt.compare(password, user.password);

    if (!mathPassword) {
        return response.status(400).json({
            message: "wrong Password"
        });
    }

    const token = jwt.sign({ _id: user.id }, process.env.Jwt_Sec, {
        expiresIn: "15d"
    });

    response.json({
        message: `Welcome back ${user.name}`,
        token,
        user
    })
});

export const myProfile = TryCatch(async (request, response) => {
    const user = await User.findById(request.user._id);

    response.json({
        user
    });
});

export const forgotPassword = TryCatch(async (request, response) => {
    const { email } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
        return response.status(404).json({
            message: "No User with this email"
        });
    }

    const token = jwt.sign({ email }, process.env.Forgot_Secret);

    const data = { email, token };

    await sendForgotMail("E learning", data);

    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    response.json({
        message: "Reset password link is send to you mail"
    })
});

export const resetPassword = TryCatch(async (request, response) => {
    const decodeData = jwt.verify(request.query.token, process.env.Forgot_Secret);

    const user = await User.findOne({ email: decodeData.email });

    if (!user) {
        return response.status(404).json({
            message: "No User with this email"
        });
    }

    if (user.resetPasswordExpire === null) {
        return response.status(400).json({
            message: "Token expired"
        });
    }

    if (user.resetPasswordExpire < Date.now()) {
        return response.status(400).json({
            message: "Token expired"
        });
    }

    const password = await bcrypt.hash(request.body.password, 10);

    user.password = password;
    user.resetPasswordExpire = null;

    await user.save();

    response.json({
        message: "Password reset successfully"
    })
});

export const createBlog = TryCatch(async (request, response) => {
    const { user, name, title, content } = request.body;

    await Blogs.create({
        owner: user,
        name: name,
        title: title,
        content: content
    })

    response.json({
        message: "Blog created successfully"
    })
})

export const getBlogs = TryCatch(async (request, response) => {
    const blogs = await Blogs.find();
    response.json({
        blogs
    })
})