import React, { useState } from 'react';
import "./courses.css";
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';
/**
 * 
 * @returns tất cả khóa học có trong hệ thống
 */
const Courses = () => {
  const { courses } = CourseData();

  const [searchCourse, setSearchCourse] = useState("");

  const filteredCourse = courses.filter(course => {
    return course.title.toLowerCase().includes(searchCourse.toLowerCase());
  })

  return (
    <div className='courses'>
      <div className="search-course">
        <input
          type="text"
          placeholder='Search course...'
          onChange={e => setSearchCourse(e.target.value)}
        />
      </div>
      <h2>Available Courses</h2>

      <div className="course-container">
        {
          courses && courses.length > 0 ? filteredCourse.map((e) => (
            <CourseCard key={e._id} course={e} />
          )) : <p>No courses yet!</p>
        }
      </div>
    </div>
  );
};

export default Courses;
