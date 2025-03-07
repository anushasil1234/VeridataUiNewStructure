// hooks/useAppWrapper.js
import { useReducer } from "react";

const initialState = {
  confirmation: false,
  consent: false,
  info: false,
  otpForm: false,
  otpSubmission: false,
  remarks: false,
  document: false,
  submit: false,
  remedy: false,
  profilePassword: false,
  filePassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, [action.modal]: true };
    case "CLOSE_MODAL":
      return { ...state, [action.modal]: false };
    default:
      return state;
  }
}

export const useAppWrapper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = (modal) => dispatch({ type: "OPEN_MODAL", modal });
  const closeModal = (modal) => dispatch({ type: "CLOSE_MODAL", modal });

  return { modalState: state, openModal, closeModal };
};
