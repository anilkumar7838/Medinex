import {
    ADD_MEDICINE_REQUEST,
    ADD_MEDICINE_SUCCESS,
    ADD_MEDICINE_FAIL,
    GET_MEDICINE_REQUEST,
    GET_MEDICINE_SUCCESS,
    GET_MEDICINE_FAIL,
    CLEAR_ERRORS,
  } from "../constants/medicineConstants";

  import axios from "axios";

   // Add Medicine
   export const addMedicine = (Data) => async (dispatch) => {
    try {
      dispatch({ type: ADD_MEDICINE_REQUEST });
      
      const config = { headers: { "Content-Type": "application/json" } };
      
    const { data } = await axios.post(`/v1/medicines`, Data, config);

    dispatch({ type: ADD_MEDICINE_SUCCESS, payload: data});
    
  } catch (error) {
    dispatch({
      type: ADD_MEDICINE_FAIL,
      payload: error.response.data.message,
    });
  }
};
   // get Medicine
   export const getMedicine = () => async (dispatch) => {
    try {
      dispatch({ type: GET_MEDICINE_REQUEST });
      
    const { data } = await axios.get(`/v1/notify`);
    dispatch({ type: GET_MEDICINE_SUCCESS, payload: data.med});
  } catch (error) {
    dispatch({
      type: GET_MEDICINE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//    // get Expire Medicine
//    export const getExpireMedicine = () => async (dispatch) => {
//     try {
//       dispatch({ type: GET_EXPIRE_MEDICINE_REQUEST });
      
//     const { data } = await axios.get(`/v1/expire`);
//     dispatch({ type: GET_EXPIRE_MEDICINE_SUCCESS, payload: data.med});
//   } catch (error) {
//     dispatch({
//       type: GET_EXPIRE_MEDICINE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };