import React, { useState, useEffect } from "react";
import "./addmedicine.css";
import Header from "../headerComponent/header";
import Loader from "../utils/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { addMedicine } from "../../actions/medicineActions";

const AddMedicine = () => {
  const userResponse = useSelector((state) => state.user);
  const medicineResponse = useSelector((state) => state.medicine);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    company: "",
    doe: "",
  });

  const { name, company, doe } = data;

  const medicineSubmit = (e) => {
    e.preventDefault();
    dispatch(addMedicine(data));
    alert.success("Medicine Added Successfully");
  };

  const registerDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userResponse.error) {
      alert.error(userResponse.error);
      dispatch(clearErrors());
    }

    if (!userResponse.isAuthenticated) {
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
          <form className="form-container2" onSubmit={medicineSubmit}>
            <div className="wrapper2">
              <div className="title">Add Medicine</div>
              <div className="form">
                <label>Medicine Name</label>
                <div className="inputfield">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input"
                    style={{ backgroundColor: "#e6f7ff" }}
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Company</label>
                <div className="inputfield">
                  <input
                    type="text"
                    placeholder="Cipla"
                    className="input"
                    style={{ backgroundColor: "#ccff33" }}
                    name="company"
                    value={company}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Date of Expiry</label>
                <div className="inputfield">
                  <input
                    type="date"
                    className="input"
                    style={{ backgroundColor: "#ffe6ff" }}
                    name="doe"
                    value={doe}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="inputfield">
                  <input type="submit" value="+ Add" className="btn" />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AddMedicine;
