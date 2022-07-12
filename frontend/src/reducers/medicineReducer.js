import {
  ADD_MEDICINE_REQUEST,
  ADD_MEDICINE_SUCCESS,
  ADD_MEDICINE_FAIL,
  GET_MEDICINE_REQUEST,
  GET_MEDICINE_SUCCESS,
  GET_MEDICINE_FAIL,
  CLEAR_ERRORS,
} from "../constants/medicineConstants";

export const medicineReducer = (state = { medicine: {} }, action) => {
  switch (action.type) {
    case ADD_MEDICINE_REQUEST:
      return {
        loading: true,
        success:false,
        isAuthenticated: false,
      };
    case ADD_MEDICINE_SUCCESS:
      return {
        ...state,
        success:true,
        loading: false,
        isAuthenticated: true,
        medicines: action.payload,
      };

    case ADD_MEDICINE_FAIL:
      return {
        loading: false,
        success:false,
        isAuthenticated: false,
        medicines: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const notificationReducer = (state = { notify: {} }, action) => {
  switch (action.type) {

    case GET_MEDICINE_REQUEST:
      return {
        loading: true,
        success:false,
        isAuthenticated: false,
      };
    case GET_MEDICINE_SUCCESS:
      return {
        ...state,
        success:true,
        loading: false,
        isAuthenticated: true,
        medicines: action.payload,
      };

    case GET_MEDICINE_FAIL:
      return {
        loading: false,
        success:false,
        isAuthenticated: false,
        medicines: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
// export const expireMedicineReducer = (state = { expireMed: {} }, action) => {
//   switch (action.type) {

//     case GET_EXPIRE_MEDICINE_REQUEST:
//       return {
//         loading: true,
//         success:false,
//       };
//     case GET_EXPIRE_MEDICINE_SUCCESS:
//       return {
//         ...state,
//         success:true,
//         loading: false,
//         medicines: action.payload,
//       };

//     case GET_EXPIRE_MEDICINE_FAIL:
//       return {
//         loading: false,
//         success:false,
//         medicines: null,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };
