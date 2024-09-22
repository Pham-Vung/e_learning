import React from 'react'
import "./header.css";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="logo">Online Courses</div>

            <div className="link">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/course"}>Courses</Link>
                <Link to={"/account"}>Account</Link>
            </div>
        </header>
    );
};

export default Header;
