import React from 'react';
import "./common.css";
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from 'react-icons/ai';
import { FaMicroblog } from "react-icons/fa";
import { UserData } from '../../context/UserContext';

const Sidebar = () => {
    const { user } = UserData();
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to={"/admin/dashboard"}>
                        <div className="icon">
                            <IoHomeSharp />
                        </div>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/admin/course"}>
                        <div className="icon">
                            <FaBook />
                        </div>
                        <span>Courses</span>
                    </Link>
                </li>
                {
                    user && user.mainrole === 'superadmin' && (
                        <li>
                            <Link to={"/admin/users"}>
                                <div className="icon">
                                    <FaUserAlt />
                                </div>
                                <span>Users</span>
                            </Link>
                        </li>
                    )
                }
                <li>
                    <Link to={"/admin/blogs"}>
                        <div className="icon">
                            <FaMicroblog />
                        </div>
                        <span>Blogs</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/account"}>
                        <div className="icon">
                            <AiOutlineLogout />
                        </div>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar