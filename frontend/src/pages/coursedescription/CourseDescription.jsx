import React, { useEffect, useState } from 'react';
import "./coursedescription.css"
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../components/loading/Loading';
import { UserData } from '../../context/UserContext';

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { fetchUser } = UserData();
    const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

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

            // fetchUser();
            // fetchCourses();
            // fetchMyCourse();
            // toast.success(data.message);
            setLoading(false);
            window.location.href = response.data.payUrl;
            // navigate(`/payment-success/${params.id}`)
        } catch (error) {
            toast.error(error.data.message);
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