import React from "react";
import "./home.css";
import BgImg from "../../assets/4.png";
import Img1 from "../../assets/3.png";
import Img2 from "../../assets/1.png";
import Img3 from "../../assets/6.png";
import Img4 from "../../assets/2.png";
import Img5 from "../../assets/1.png";

import Footer from "../Footer/footer";
import Header from "../headerComponent/header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className="home-container">
      <img className="bg-img" src={BgImg} alt="not found" />
      <section className="content-block">
        <div className="content-icon" id="icon1">
          <img src={Img1} className="icon1" alt="not found" />
        </div>
        <div className="content">
          <h1>TOWARDS SAFETY</h1>
          <p>After the expiry date medicines may not be safe or as effective</p>
        </div>
        {/* --------------- */}
        <div className="content-icon" id="icon2">
          <img src={Img2} className="icon2" alt="not found" />
        </div>
        <div className="content">
          <h1>100% EFFECTIVE</h1>
          <p>Get timely alert and save your time and money</p>
        </div>
        {/* ---------------- */}
        <div className="content-icon" id="icon3">
          <img src={Img3} className="icon3" alt="not found" />
        </div>
        <div className="content">
          <h1>TRACK MEDS</h1>
          <p>Track all your medicine need for better health</p>
        </div>
      </section>

      <section className='feature-icon'>
        <div className="home-features" onClick={()=>{navigate("/medicines")}}>
          <img src={Img4} alt="not found" />
          <h2>Add medicine to Track</h2>
        </div>
        <div className="home-features" onClick={()=>{navigate("/notify")}}>
          <img src={Img5} alt="not found" />
          <h2>Upcoming Notifications</h2>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Home;
