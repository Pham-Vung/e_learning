import React, { useState } from 'react';
import axios from "axios";
import { server } from "../../main";
import toast from 'react-hot-toast';

const Create = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  console.log(user);

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    try {
      const name = user.name;
      const { data } = await axios.post(`${server}/api/user/createBlog`, { user, name, title, content }, {
        headers: {
          token: localStorage.getItem('token')
        }
      });

      toast.success(data.message);
      setBtnLoading(false);
      setTitle("");
      setContent("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  return (
    <div className='create-container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Title'
          className='title-input'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
          required
        />
        <textarea
          type="text"
          placeholder='Content'
          className='content-input'
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button
          className='common-btn'
          disabled={btnLoading}
        >
          {btnLoading ? "Please wait..." : "Create blog"}
        </button>
      </form>
    </div>
  )
}

export default Create;
