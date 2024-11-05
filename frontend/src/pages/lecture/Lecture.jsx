import React, { useEffect, useState } from 'react';
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from '../../components/loading/Loading';
import toast from 'react-hot-toast';

const Lecture = ({ user }) => {
    const [lectures, setLectures] = useState([]);// lưu trữ bài giảng đã hoàn thành
    const [lecture, setLecture] = useState([]); // bài giảng đang xem
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);// trạng thái khi tạo bài giảng
    const [show, setShow] = useState(false);
    const params = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState("");// để xem video trước khi tải lên
    const [btnLoading, setBtnLoading] = useState(false);

    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
        return navigate("/")
    }

    const fetchLectures = async () => {
        try {
            const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setLectures(data.lectures);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    const fetchLecture = async (id) => {
        setLecLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/lecture/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setLecture(data.lecture);
            setLecLoading(false);
        } catch (error) {
            console.log(error);
            setLecLoading(false);
        }
    }

    const changeVideoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setVideoPrev(reader.result);
            setVideo(file);
        }
    }

    const submitHandler = async (e) => {
        setBtnLoading(true);
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("file", video);

        try {
            const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });

            toast.success(data.message);
            setBtnLoading(false);
            setShow(false);
            fetchLectures();
            setTitle("");
            setDescription("");
            setVideoPrev("");
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    const deleteHandler = async (id) => {
        if (confirm("Are you sure want to delete this lecture")) {
            try {
                const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });

                toast.success(data.message);
                fetchLectures();
            } catch (error) {
                toast.error(error.response.data.message);

            }
        }
    }

    useEffect(() => {
        fetchLectures();
    }, []);

    return (
        <>
            {loading ? <Loading /> : <>
                <div className="lecture-page">
                    <div className="left">
                        {lecLoading ? (
                            <Loading />
                        ) : (
                            <>
                                {lecture.video ? (
                                    <>
                                        <video
                                            src={`${server}/${lecture.video}`}
                                            width={"100%"}
                                            controls
                                            controlsList="nodownload noremoteplayback"
                                            disablePictureInPicture
                                            disableRemotePlayback
                                            autoPlay
                                            onEnded={() => addProgress(lecture._id)}
                                        ></video>
                                        <h1>{lecture.title}</h1>
                                        <h3>{lecture.description}</h3>
                                    </>
                                ) : (
                                    <h1>Please Select a Lecture</h1>
                                )}
                            </>
                        )}
                    </div>
                    <div className="right">
                        {user && user.role === "admin" && (
                            <button className='common-btn' onClick={() => setShow(!show)}>
                                {show ? "Close" : "Add lecture +"}
                            </button>
                        )}
                        {
                            show && (<div className="lecture-form">
                                <h2>Add lecture</h2>
                                <form onSubmit={submitHandler}>
                                    <label htmlFor="text">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="text">Description</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        required
                                    />

                                    <input
                                        type="file"
                                        placeholder='Choose video'
                                        onChange={changeVideoHandler}
                                        required
                                    />

                                    {
                                        videoPrev && <video src={videoPrev} width={300} controls></video>
                                    }

                                    <button
                                        disabled={btnLoading}
                                        type='submit'
                                        className='common-btn'
                                    >
                                        {btnLoading ? "Please wait..." : "Add"}
                                    </button>
                                </form>
                            </div>
                            )}

                        {
                            lectures && lectures.length > 0 ? (
                                lectures.map((e, i) => (
                                    <>
                                        <div
                                            onClick={() => fetchLecture(e._id)}
                                            key={i}
                                            className={`lecture-number ${lecture._id === e._id && "active"}`}
                                        >
                                            {i + 1}. {e.title}
                                        </div>
                                        {
                                            user && user.role === "admin" && (
                                                <button
                                                    onClick={() => deleteHandler(e._id)}
                                                    className='common-btn'
                                                    style={{ background: 'red' }}
                                                >
                                                    Delete {e.title}
                                                </button>
                                            )}
                                    </>
                                ))
                            ) : (
                                <p>No Lectures Yet!</p>
                            )}
                    </div>
                </div>
            </>}
        </>
    );
}

export default Lecture;