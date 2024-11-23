import React, { useEffect } from 'react';
import "./paymentsuccess.css";
import { Link, useLocation } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import { CourseData } from '../../context/CourseContext';
import toast from 'react-hot-toast';
import { server } from '../../main';
import axios from "axios";

/**
 * 
 * @param {user} lưu trữ thông tin user
 * @returns kiểm tra trạng thái đơn hàng và thông báo kết quả đơn hàng
 */
const PaymentSuccess = ({ user }) => {
    // const [hasVerified, setHasVerified] = useState(false);
    const location = useLocation();

    const { fetchUser } = UserData();
    const { fetchCourses, fetchMyCourse } = CourseData();
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get('extraData');
    const orderId = queryParams.get("orderId");
    const amount = queryParams.get("amount");

    const verifyPayment = async () => {
        try {
            const { data } = await axios.post(`${server}/api/verification/${courseId}`,
                {
                    orderId: orderId,
                    amount: amount,
                    courseId: courseId,
                },
                {
                    headers: {
                        token
                    }
                }
            );

            // render lại thông tin người dùng, tất cả khóa học và khóa học của tôi
            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const verified = localStorage.getItem(`verified_${orderId}`);
        if (!verified && orderId && amount && courseId) {
            verifyPayment();
            localStorage.setItem(`verified_${orderId}`, "true");
        }
    }, [amount, courseId, orderId]);

    return (
        <div className='payment-success-page'>
            {user && <div className='success-message'>
                <h2>Payment successful</h2>
                <p>Your course subscription has been activated</p>
                {/* chuyển sang khóa học của tôi */}
                <Link to={`/${user.id}/dashboard`} className='common-btn'>Go to dashboard</Link>
            </div>
            }
        </div>
    );
}

export default PaymentSuccess;