import React from 'react';
import "./about.css";

const About = () => {
    return (
        <div className='about'>
            <div className="about-content">
                <h2>Học với niềm đam mê để biến ước mơ của bạn thành hiện thực</h2>
                <p>
                    Ai cũng có ước mơ lớn, và để ước mơ
                    đó trở thành hiện thực, bạn phải thức dậy
                    bắt tay vào làm tốt từ những điều nhỏ bé nhất
                </p>
            </div>
            <div className="about-main-content">
                <div className="main-content">
                    <img src="https://branium.pro/wp-content/uploads/2022/06/courses-7.jpg" alt="" />
                    <h3>Chúng tôi là ai</h3>
                    <p>Branium là địa chỉ cung cấp các
                        khóa học lập trình online chất lượng,
                        uy tín và không ngừng hoàn thiện.
                        Chúng tôi có cả các khóa học nền
                        tảng: OOP - DSA - SQL và cả các
                        khóa học dành cho người đi làm:
                        Lập trình Android Java,
                        Android Kotlin, Android
                        Thực chiến, Jetpack Compose
                        và sắp tới có cả Game Unity.
                    </p>
                </div>
                <div className="main-content">
                    <img src="https://branium.pro/wp-content/uploads/2022/06/courses-4.jpg" alt="" />
                    <h3>Tại sao chúng tôi làm khóa học it?</h3>
                    <p>Sau thời gian dài làm việc tại các công
                        ty công nghệ và tiếp xúc với nhiều
                        người mới đi làm trong lĩnh vực
                        IT-software-mobile-game chúng tôi
                        nhận ra các nhân sự mới vào nghề có
                        chung nhiều điểm yếu chí mạng -
                        Yếu kiến thức nền tảng. Các bạn
                        bị hẫng khi vào công việc vì còn
                        nhiều điều chưa biết, nhiều
                        kiến thức chưa học, nhiều kĩ năng
                        chưa thực sự tốt. Đây chỉ nói về
                        lĩnh vực chuyên môn kĩ thuật.
                        Vì lẽ đó các khóa học tâm huyết
                        về từng mảnh ghép IT đã lần
                        lượt ra đời.
                    </p>
                </div>
                <div className="main-content">
                    <img src="https://branium.pro/wp-content/uploads/2022/06/courses-8.jpg" alt="" />
                    <h3>Sự khác biệt với các khóa học trên thị trường</h3>
                    <p>Thị trường không thiếu các khóa học cả online và offline.
                        Tuy vậy khóa học của Branium có những điểm riêng:
                        nội dung khóa học tập trung chủ yếu vào phần thực
                        hành; nhiều bài tập top hàng đầu tại Việt Nam.
                        Nội dung bài học gồm nhiều thành phần, đa dạng:
                        video, slide, bài kiểm tra trắc nghiệm, bài tập
                        thực hành, lời giải mẫu, project cuối khóa,
                        hỗ trợ phỏng vấn online 1-1, hỗ trợ tìm việc
                        nếu học viên đã tốt nghiệp và có nhu cầu.
                        Nội dung khóa học liên tục được cập nhật để
                        bắt kịp thời đại nên các học viên sẽ không lo
                        phải sử dụng các công cụ, công nghệ lỗi thời,
                        lạc hậu cùi bắp. Chúng tôi cũng sử dụng trực
                        tiếp các công cụ, công nghệ nhà tuyển dụng
                        thường yêu cầu khi bạn đi làm để bạn quen dần
                        với chúng.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;
