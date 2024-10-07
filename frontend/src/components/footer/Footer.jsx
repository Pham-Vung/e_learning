import React from 'react';
import "./footer.css";
import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from "react-icons/ai"

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer-content">
          <p>
            &copy; 2024 Your Online Courses. All right reserved. <br />
            Made with ❤️ Phạm Văn Vững
          </p>

          <div className="social-links">
            <a href="https://www.facebook.com/vung.phamvan.5036?locale=vi_VN">
              <AiFillFacebook />
            </a>

            <a href="https://www.instagram.com/vung.phamvan.5036/">
              <AiFillInstagram />
            </a>

            <a href="https://www.tiktok.com/@phamvanvan32">
              <AiFillTikTok />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
