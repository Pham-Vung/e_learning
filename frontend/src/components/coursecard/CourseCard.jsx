import React from 'react';
import "./courseCard.css";
import { server } from '../../main';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CourseData } from '../../context/CourseContext';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const { user, isAuth } = UserData();

    const { fetchCourses } = CourseData();

    const deleteHandler = async (id) => {
        if (confirm("Are you sure you want to delete this course")) {
            try {
                const { data } = await axios.delete(`${server}/api/course/${id}`,
                    {
                        headers: {
                            token: localStorage.getItem("token")
                        }
                    }
                );

                toast.success(data.message);
                fetchCourses();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

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
                user && user.role === "admin" && (
                    <button
                        className="common-btn"
                        style={{ backgroundColor: "red" }}
                        onClick={() => deleteHandler(course._id)}
                    >
                        Delete
                    </button>
                )
            }
        </div>
    )
}

export default CourseCard
