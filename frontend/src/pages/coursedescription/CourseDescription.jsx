import React, { useEffect } from 'react';
import "./coursedescription.css"
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();

    const { fetchCourse, course } = CourseData();

    useEffect(() => {
        fetchCourse(params.id);
    }, []);

    return (
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
                    <p>Let's get started with course at {course.price} VNĐ</p>

                    {
                        user && user.subscription.includes(course._id) ? (
                            <button className="common-btn" onClick={() => navigate(`/course/study/${course._id}`)}>Study</button>
                        ) : (
                            <button className="common-btn">Buy now</button>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default CourseDescription;