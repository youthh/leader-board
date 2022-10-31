import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";
import { RootState } from "../Redux/store";

type ModalState = {
  isModal: boolean;
  modalName: string;
  modalScore: number;
  isAddUser: boolean;
  alertMessage: { severity: AlertColor; message: string; isShow: boolean };
};

const initialState: ModalState = {
  isModal: false,
  modalName: "",
  modalScore: 0,
  isAddUser: false,
  alertMessage: { severity: "error", message: "", isShow: false },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeAlert: (state, action) => {
      state.alertMessage.isShow = action.payload;
    },
    setAlert: (
      state,
      action: PayloadAction<{ severity: AlertColor; message: string }>
    ) => {
      state.alertMessage.isShow = true;
      state.alertMessage.severity = action.payload.severity;
      state.alertMessage.message = action.payload.message;
    },
    setAddModalUser: (state) => {
      state.isModal = !state.isModal;
      state.isAddUser = !state.isAddUser;
    },
    setModal: (
      state,
      action: PayloadAction<{ name: string; score: number } | undefined>
    ) => {
      state.isModal = !state.isModal;
      state.modalName = action.payload ? action.payload.name : "";
      state.modalScore = action.payload ? action.payload.score : 0;
    },
  },
});

export const modalSelector = (state: RootState) => {
  return {
    isModal: state.modalSlice.isModal,
    modalName: state.modalSlice.modalName,
    modalScore: state.modalSlice.modalScore,
    isAddUser: state.modalSlice.isAddUser,
    alertMessage: state.modalSlice.alertMessage,
  };
};

export const { closeAlert, setAlert, setModal, setAddModalUser } =
  modalSlice.actions;

export default modalSlice.reducer;
