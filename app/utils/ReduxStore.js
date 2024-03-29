// store.js

import { createStore } from "redux";

// Define your initial state and reducer function
const initialState = {
  sharedVariable: null,
  selectedFile: [],
  sessionStatus: [],
  onSuccess: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHARED_VARIABLE":
      return {
        ...state,
        sharedVariable: action.payload,
      };
    case "SELECTED_FILE":
      return {
        ...state,
        selectedFile: action.payload,
      };
    case "SESSION_STATUS":
      return {
        ...state,
        sessionStatus: action.payload,
      };
    case "ON_SUCCESS":
      return {
        ...state,
        onSuccess: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
