import React from 'react';
import "./testimonials.css";

const Testimonials = () => {
    const testimonialsData = [
        {
            id: 1,
            name: "Phạm Nhật Vượng",
            position: "Student",
            message:
                "Website này đã giúp tôi học rất hiệu quả. Các khóa học thật tuyệt vời và những người hướng dẫn thật xuất sắc",
            image:
                "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ_BLMugZGQ9RnMQtTUgAywhARwDCKzrX6UBaOyGUPUS_sr9uf2npo7LBB1I8jSEu1rVPN9PlHixcSwirA",
        },
        {
            id: 2,
            name: "Sơn Tùng MTP",
            position: "Student",
            message:
                "Tôi đã học được nhiều điều ở đây hơn bất kỳ trang nào khác. Các bài học và câu hỏi tương tác làm cho việc học trở nên thú vị.",
            image:
                "https://danviet.mediacdn.vn/296231569849192448/2024/6/13/son-tung-mtp-17182382517241228747767.jpg",
        },
        {
            id: 3,
            name: "Đỗ Quang Hiển",
            position: "Student",
            message:
                "Website này đã giúp tôi học rất hiệu quả. Các khóa học thật tuyệt vời và những người hướng dẫn thật xuất sắc",
            image:
                "https://doanhnghiepkinhtexanh.vn/uploads/images/2022/03/02/chu-tich-tap-doan-tt-anh-1-1646188070.jpg",
        },
        {
            id: 4,
            name: "Nguyễn Thị Phương Thảo",
            position: "Student",
            message:
                "Tôi đã học được nhiều điều ở đây hơn bất kỳ trang nào khác. Các bài học và câu hỏi tương tác làm cho việc học trở nên thú vị.",
            image:
                "https://static1.cafeland.vn/cafelandnew/hinh-anh/2020/05/13/nguyen-thi-phuong-thao-cafeland.jpg",
        },
    ];

    return (
        <section className="testimonials">
            <h2>What our students say</h2>
            <div className="testimonials-cards">
                {
                    testimonialsData.map((e) => (
                        <div className="testimonial-card" key={e.id}>
                            <div className="student-image">
                                <img src={e.image} alt="" />
                            </div>
                            <p className="message">{e.message}</p>
                            <div className="info">
                                <p className="name">{e.name}</p>
                                <p className="position">{e.position}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Testimonials;
