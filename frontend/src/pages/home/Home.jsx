import React from 'react';
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from '../../components/testimonials/Testimonials';

/**
 * 
 * @returns trang chủ
 */

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Explore what professionals like you are learning the most</h1>
          <p>Learn, Grow, Excel</p>
          <button
            className="common-btn"
            onClick={() => {
              navigate("/courses");
            }}
          >
            Visit Courses
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}

export default Home;
