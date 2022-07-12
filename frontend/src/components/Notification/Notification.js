import React, { useState, useEffect } from "react";
import "./notify.css";
import Header from "../headerComponent/header";
import Loader from "../utils/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { getMedicine } from "../../actions/medicineActions";

const Notification = () => {
  const userResponse = useSelector((state) => state.user);
  const medicineResponse = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (userResponse.error) {
      alert.error(userResponse.error);
      dispatch(clearErrors());
    }
    if (!userResponse.isAuthenticated) {
      navigate(`/`);
    }
    dispatch(getMedicine());
  }, [dispatch, userResponse.error, alert, userResponse.isAuthenticated]);

  return (
    <>
    {medicineResponse.loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <form className="form-container3">
            <div class="wrapper3">
              <div class="title">Notification's</div>
              <div class="form">
                {medicineResponse.medicines && medicineResponse.medicines.map((res, i) => {
                      return (
                        <>
                          <div class="inputfield">
                            <input
                              type="text"
                              class="input"
                              style={{ backgroundColor: "#ccff33" }}
                              name="name"
                              value={res.name}
                              readOnly
                            />
                            <label>Expire On {res.doe}</label>
                          </div>
                        </>
                      );
                    })}
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Notification;
