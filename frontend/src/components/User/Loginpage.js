import React, { useState, useEffect } from "react";
import Header from "../headerComponent/header";
import "./LoginPage.css";
import profile from "./../../assets/Profile.png";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import Loader from "../utils/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Loginpage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const userResponse = useSelector((state) => state.user);

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log("loginPage",token);
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    dispatch(login(loginName, loginPassword));
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
          <form className="main"  onSubmit={loginSubmit}>
            <div className="sub-main">
              <div>
                <div className="imgs">
                  <div className="container-image">
                    <img src={profile} alt="profile" className="profile" />
                  </div>
                </div>
                <div>
                  <h1 className="login-heading">Login</h1>
                  <div>
                    <PersonIcon className="email" />
                    <input
                      type="text"
                      placeholder="Email"
                      className="name"
                      required
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                    />
                  </div>
                  <div className="second-input">
                    <HttpsIcon className="pass" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="name"
                      required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    />
                  </div>
                  <div className="login-button">
                    <button>Sign in</button>
                  </div>

                  <p className="link">
                    <Link to="/password/forgot">Forgot password ?</Link> Or{" "}
                    <Link to="/register">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Loginpage;
