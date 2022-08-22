import React from "react";
import "./contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import Header from "../headerComponent/header";

// ----------- Component : contactUs -------------

const Contact = React.forwardRef((props,ref)=>{
  const [msg, setMsg] = React.useState({ Name: "", email: "", message: "" });

  const notify = (message, type = null) => {
    if (!type) {
      toast(message, { position: "top-center" });
    } else if (type === "error") {
      toast.error(message, { position: "top-center" });
    } else {
      toast.success(message, { position: "top-center", autoClose: 5 * 1000 });
    }
  };

  // --------- Function to set value of field at runtime --------------

  const formHandler = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newMsg = { ...msg };
    newMsg[fieldName] = fieldValue;

    setMsg(newMsg);
  };

  // ----------------- Confirmation on Submit --------------------
  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/v1/contact", msg)
      .then((res) => {
        notify(`Message sent Successfully.`, "success");
      })
      .catch((err) => {
        notify(err.response.data.message, "error");
      });
  };
  return (
    <>
    <Header/>
    <section className="contact-main" id="contact" ref={ref}>
      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>
        For any query, fill the form to contact us.
        </p>
      </div>
      <div className="contact-container">
        <div className="contactInfo">
          <div className="contact-box">
            <div className="icon">
              <LocationOnIcon />
            </div>
            <div className="text">
              <h3>Address</h3>
              <p>Sgt University gurugram</p>
            </div>
          </div>
          <div className="contact-box">
            <div className="icon">
              <PhoneForwardedIcon />
            </div>
            <div className="text">
              <h3>Mb.Number</h3>
              <p>7838908721</p>
            </div>
          </div>
          <div className="contact-box">
            <div className="icon">
              <MailIcon />
            </div>
            <div className="text">
              <h3>Email</h3>
              <p>medinex@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="contactForm">
          <form onSubmit={formSubmit}>
            <h2>Send Message</h2>
            <div className="inputBox">
              <input type="text" name="Name" onChange={formHandler} required />
              <span>Full Name</span>
            </div>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                onChange={formHandler}
                required
              />
              <span>Email</span>
            </div>
            <div className="inputBox">
              <textarea
                name="message"
                onChange={formHandler}
                required
              ></textarea>
              <span>Type your Message..</span>
            </div>
            <div className="inputBox">
              <input type="Submit" name="" value="Send" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
    </>
  );
})

export default Contact;
