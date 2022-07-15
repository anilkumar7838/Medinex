import React, { useState, useEffect } from "react";
import Header from "../headerComponent/header";
import "./Register.css";
import Loader from "../utils/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Register = () => {
  const userResponse = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone:"",
    email: "",
    password:"",
    dob:"",
    gender:"",
    address: "",
    country: "",
    state: "",
    city:"",
  });

  const { firstname,lastname,phone, email,password, dob,gender,address,country,state,city } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userResponse.error) {
      alert.error(userResponse.error);
      dispatch(clearErrors());
    }

    if (userResponse.isAuthenticated) {
      navigate(`/`);
    }
  }, [dispatch, userResponse.error, alert, userResponse.isAuthenticated]);

  return (
    <>
      {userResponse.loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <form className="form-container" onSubmit={registerSubmit}>
            <div className="wrapper">
              <div className="title">Registration Form</div>
              <div className="form">
                <label>Name</label>
                <div className="inputfield">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input"
                    style={{ backgroundColor: "#e6f7ff" }}
                    name="firstname"
                    value={firstname}
                    onChange={registerDataChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input"
                    style={{ backgroundColor: "#e6f7ff" }}
                    name="lastname"
                    value={lastname}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Phone Number</label>
                <div className="inputfield">
                  <input
                    type="text"
                    value="+91"
                    className="input"
                    style={{ backgroundColor: "#ccff33", width: "15%" }}
                  />
                  <input
                    type="text"
                    placeholder="98765-43210"
                    className="input"
                    style={{ backgroundColor: "lightgrey" }}
                    name="phone"
                    value={phone}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Email Address</label>
                <div className="inputfield">
                  <input
                    type="text"
                    placeholder="gaurav@gmail.com"
                    className="input"
                    style={{ backgroundColor: "#ccff33" }}
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <label>Password</label>
                <div class="inputfield">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    style={{ backgroundColor: "#e6f7ff" }}
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Date of Birth</label>
                <div class="inputfield">
                  <input
                    type="date"
                    className="input"
                    style={{ backgroundColor: "#ffe6ff" }}
                    name="dob"
                    value={dob}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Gender</label>
                <div className="inputfield">
                  <div className="custom_select">
                    <select style={{ backgroundColor: "#ffe6ff" }}
                    name="gender"
                    value={gender}
                    onChange={registerDataChange}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <label>Residence Address</label>
                <div className="inputfield">
                  <textarea
                    style={{ backgroundColor: "#ffcce0" }}
                    className="textarea"
                    name="address"
                    value={address}
                    onChange={registerDataChange}
                  ></textarea>
                </div>
                <div className="inputfield">
                  <input
                    type="text"
                    placeholder="Country"
                    className="input"
                    style={{ backgroundColor: "#ffe6ff" }}
                    name="country"
                    value={country}
                    onChange={registerDataChange}
                  />
                  <input
                    type="text"
                    className="input"
                    style={{ backgroundColor: "#ffe6ff" }}
                    name="state"
                    value={state}
                    onChange={registerDataChange}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    className="input"
                    style={{ backgroundColor: "#ffe6ff" }}
                    name="city"
                    value={city}
                    onChange={registerDataChange}
                    placeholder="City"
                  />
                </div>

                <div className="inputfield">
                  <input type="submit" value="Register" className="btn" />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
