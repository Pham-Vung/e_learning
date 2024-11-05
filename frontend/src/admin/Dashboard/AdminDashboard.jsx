import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Utils/Layout';
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
    const navigate = useNavigate();

    if (user && user.role !== "admin") {
        return navigate("/");
    }

    const [status, setStatus] = useState([]);

    const fetchStatus = async () => {
        try {
            const { data } = await axios.get(`${server}/api/status`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });

            setStatus(data.status);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <div>
            <Layout>
                <div className="main-content">
                    <div className="box">
                        <p>Total courses</p>
                        <p>{status.totalCourses}</p>
                    </div>
                    <div className="box">
                        <p>Total lectures</p>
                        <p>{status.totalLectures}</p>
                    </div>
                    <div className="box">
                        <p>Total Users</p>
                        <p>{status.totalUsers}</p>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default AdminDashboard;