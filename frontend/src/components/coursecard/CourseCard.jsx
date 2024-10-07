import React from 'react';
import "./courseCard.css";
import { server } from '../../main';

const CourseCard = ({ course }) => {
    return (
        <div className='course-card'>
            <img src={`${server}/${course.image}`} alt="" className='course-image' />
            <h3>{course.title}</h3>
            <p>Instructor - {course.createdBy}</p>
            <p>Duration - {course.duration}</p>
            <p>Price - {course.price}</p>
            <button className='common-btn'>Get started</button>
        </div>
    )
}

export default CourseCard