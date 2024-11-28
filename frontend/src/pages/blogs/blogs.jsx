import React, { useState, useEffect } from 'react';
import "./Blogs.css";
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchBlogs();
  }, [])
  return (
    <div className='blogs'>
      {
        loading ? (<Loading />) : (
          blogs.length === 0 ? (
            <h2>No blogs yet.</h2>
          ) : (
            blogs.map(blog => (
              <div key={blog._id} className="blog">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <p>Posted by: {blog.name}</p>
              </div>
            ))
          ))
      }
      {/* <div className="blogs-owner"></div>
      <div className="blogs-heading"></div>
      <div className="blogs-content"></div> */}
    </div>
  )
}

export default Blogs