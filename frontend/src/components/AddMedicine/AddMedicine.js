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
    if (medicineResponse.success) {
      alert.success("Medicine Added Successfully");

      setTimeout(() => {
        medicineResponse.success = false;
      }, 4000);
    }
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
            <div class="wrapper2">
              <div class="title">Add Medicine</div>
              <div class="form">
                <label>Medicine Name</label>
                <div class="inputfield">
                  <input
                    type="text"
                    placeholder="First Name"
                    class="input"
                    style={{ backgroundColor: "#e6f7ff" }}
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Company</label>
                <div class="inputfield">
                  <input
                    type="text"
                    placeholder="Cipla"
                    class="input"
                    style={{ backgroundColor: "#ccff33" }}
                    name="company"
                    value={company}
                    onChange={registerDataChange}
                  />
                </div>

                <label>Date of Expiry</label>
                <div class="inputfield">
                  <input
                    type="date"
                    class="input"
                    style={{ backgroundColor: "#ffe6ff" }}
                    name="doe"
                    value={doe}
                    onChange={registerDataChange}
                  />
                </div>

                <div class="inputfield">
                  <input type="submit" value="+ Add" class="btn" />
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
