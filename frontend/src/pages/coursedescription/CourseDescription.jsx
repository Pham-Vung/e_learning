import React, { useEffect, useState } from 'react';
import "./coursedescription.css"
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../components/loading/Loading';

/**
 * 
 * @param {user} param0 
 * @returns thông tin khóa học và có thể mua nếu có nhu cầu
 */

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { fetchCourse, course } = CourseData();

    useEffect(() => {
        fetchCourse(params.id);
    }, []);

    const checkoutHandler = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const response = await axios.post(`${server}/api/course/checkout/${params.id}`, {}, {
                headers: {
                    token
                }
            });

            setLoading(false);
            window.location.href = response.data.payUrl;
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {course && (
                        <div className='course-description'>
                            <div className="course-header">
                                <img
                                    src={`${server}/${course.image}`}
                                    className='course-image'
                                />
                                <div className="course-info">
                                    <h2>{course.title}</h2>
                                    <p>Instructor: {course.createdBy}</p>
                                    <p>Duration: {course.duration} weeks</p>
                                </div>
                            </div>
                            <p>{course.description}</p>

                            <p>Let's get started with course at {course.price} VNĐ</p>

                            {
                                user && user.subscription.includes(course._id) ? (
                                    <button className="common-btn" onClick={() => navigate(`/course/study/${course._id}`)}>Study</button>
                                ) : (
                                    <button className="common-btn" onClick={checkoutHandler}>Buy now</button>
                                )
                            }
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default CourseDescription;