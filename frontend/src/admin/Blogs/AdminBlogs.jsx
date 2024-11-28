import React, { useEffect, useState } from 'react';
import "./adminblogs.css";
import Layout from '../Utils/Layout';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminBlogs = ({ user }) => {
    const [blogs, setBlogs] = useState([]);

    const navigate = useNavigate();

    if (user && user.role !== 'admin') {
        return navigate('/');
    }

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(`${server}/api/user/getBlogs`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });

            setBlogs(data.blogs);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBlog = async (id) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            try {
                const { data } = await axios.delete(`${server}/api/blog/${id}`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });

                toast.success(data.message);
                fetchBlogs();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <Layout>
            <div className="admin-blogs">
                <h1>All blogs</h1>
                {
                    blogs.length === 0 ? (<div className="no-blogs">No blogs yet.</div>) : (
                        <table border={"black"}>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Title</td>
                                    <td>Content</td>
                                    <td>Author</td>
                                    <td>Delete blog</td>
                                </tr>
                            </thead>

                            {
                                blogs && blogs.map((e, i) => (
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{e.title}</td>
                                            <td>{e.content}</td>
                                            <td>{e.name}</td>
                                            <td>
                                                <button
                                                    className='common-btn'
                                                    onClick={() => deleteBlog(e._id)}
                                                >
                                                    Delete blog
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>
                    )
                }

            </div>
        </Layout>
    )
}

export default AdminBlogs;
