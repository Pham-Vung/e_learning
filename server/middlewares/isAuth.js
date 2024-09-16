import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

/**
 * kiểm tra tính xác thực của người dùng thông qua JWT token. 
 * Nếu token hợp lệ, middleware sẽ gán thông tin người dùng vào request.user
 *  và cho phép yêu cầu tiếp tục xử lý
 * Nếu không, nó sẽ trả về phản hồi yêu cầu người dùng đăng nhập
 */
export const isAuth = async (request, response, next) => {
    try {
        // Nơi chứa JWT token khi người dùng đã đăng nhập
        const token = request.headers.token;

        if (!token) {
            return response.status(403).json({
                message: "Please login"
            });
        }
        
        const decodedData = jwt.verify(token, process.env.Jwt_Sec);// giải mã token

        request.user = await User.findById(decodedData._id);

        next();
    } catch (error) {
        response.status(500).json({
            message: "Login first"
        });
    }
};

export const isAdmin = (request, response, next) => {
    try {
        if (request.user.role !== "admin") {
            return response.status(403).json({
                message: "You are not admin"
            });
        }
 
        next();
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
}