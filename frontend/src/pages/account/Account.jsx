import React from 'react';
import "./account.css";
import { MdDashboard } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @param {user} param0 
 * @returns Trang thông tin cá nhân của user
 */
const Account = ({ user }) => {
    const { setIsAuth, setUser } = UserData();

    const navigate = useNavigate();

    // đăng xuất tài khoản
    const logoutHandler = () => {
        localStorage.clear()
        setUser([]);
        setIsAuth(false);
        toast.success("Logged out");
        navigate("/login");
    }

    return (
        <div>
            {user && (
                <div className="profile">
                    <h2>My Profile</h2>
                    <div className="profile-info">
                        <p>
                            <strong>Name - {user.name}</strong>
                        </p>
                        <p>
                            <strong>Email - {user.email}</strong>
                        </p>
                        <button onClick={() => navigate(`/${user._id}/dashboard`)} className='common-btn'>
                            <MdDashboard />
                            Dashboard
                        </button>

                        <br />

                        {
                            user.role === "admin" && (
                                <button onClick={() => navigate(`/admin/dashboard`)} className='common-btn'>
                                    <MdDashboard />
                                    Admin Dashboard
                                </button>
                            )
                        }

                        <button
                            className='common-btn'
                            onClick={() => navigate(`/${user._id}/create-article`)}
                        >
                            <TfiWrite />
                            Blogging
                        </button>
                        <button
                            className='common-btn logout-btn'
                            onClick={logoutHandler}
                        >
                            <RiLogoutBoxFill />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
