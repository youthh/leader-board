import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";
import { RootState } from "../Redux/store";

type ModalState = {
  isShowModal: boolean;
  modalName: string;
  modalScore: number;
  isShowAddUserModal: boolean;
  isShowModalAlertMessage: boolean;
  isShowEditScoreModal: boolean;
};

const initialState: ModalState = {
  isShowModal: false,
  modalName: "",
  modalScore: 0,
  isShowAddUserModal: false,
  isShowEditScoreModal: false,
  isShowModalAlertMessage: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeAlert: (state, action) => {
      state.isShowModalAlertMessage = action.payload;
    },
    setAlert: (state) => {
      state.isShowModalAlertMessage = true;
    },
    setAddModalUser: (state) => {
      state.isShowModal = !state.isShowModal;
      state.isShowAddUserModal = !state.isShowAddUserModal;
    },
    setModal: (
      state,
      action: PayloadAction<{ name: string; score: number } | undefined>
    ) => {
      state.isShowModal = !state.isShowModal;
      state.isShowEditScoreModal = !state.isShowEditScoreModal;
      state.modalName = action.payload ? action.payload.name : "";
      state.modalScore = action.payload ? action.payload.score : 0;
    },
  },
});

export const modalSelector = (state: RootState) => {
  return {
    isShowModal: state.modalSlice.isShowModal,
    modalName: state.modalSlice.modalName,
    modalScore: state.modalSlice.modalScore,
    isShowAddUserModal: state.modalSlice.isShowAddUserModal,
    isShowModalAlertMessage: state.modalSlice.isShowModalAlertMessage,
    isShowEditScoreModal: state.modalSlice.isShowEditScoreModal,
  };
};

export const { closeAlert, setAlert, setModal, setAddModalUser } =
  modalSlice.actions;

export default modalSlice.reducer;
