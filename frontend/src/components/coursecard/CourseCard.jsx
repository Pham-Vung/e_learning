import React from 'react';
import "./courseCard.css";
import { server } from '../../main';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const { user, isAuth } = UserData();


    return (
        <div className='course-card'>
            <img src={`${server}/${course.image}`} alt="" className='course-image' />
            <h3>{course.title}</h3>
            <p>Instructor - {course.createdBy}</p>
            <p>Duration - {course.duration} weeks</p>
            <p>Price - {course.price} VNĐ</p>
            {
                isAuth ? (
                    <>
                        {/* nếu đã đăng nhập */}
                        {user && user.role !== "admin" ? (
                            // là user
                            <>
                                {
                                    user.subscription.includes(course._id) ? (
                                        // đã đăng ký khóa học
                                        <button
                                            className='common-btn'
                                            onClick={() => navigate(`/course/study/${course._id}`)}
                                        >
                                            Study
                                        </button>
                                    ) : (
                                        <button
                                            className='common-btn'
                                            onClick={() => navigate(`/course/${course._id}`)}
                                        >
                                            Get started
                                        </button>
                                    )
                                }
                            </>
                        ) : (
                            // là admin
                            <button
                                className='common-btn'
                                onClick={() => navigate(`/course/study/${course._id}`)}
                            >
                                Study
                            </button>
                        )}
                    </>
                ) : (
                    // chưa đăng nhập
                    <button
                        className='common-btn'
                        onClick={() => navigate("/login")}
                    >
                        Get started
                    </button>
                )
            }
            <br />

            {
                user && user.role === "admin" && <button className="common-btn" style={{ backgroundColor: "red" }}>Delete</button>
            }
        </div>
    )
}

export default CourseCard
