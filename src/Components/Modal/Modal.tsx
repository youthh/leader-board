import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { leaderSelector } from "../../Slices/leaderSlice";
import { useSelector } from "react-redux";
import "./Modal.css";
import ModalEditScore from "./ModalEditScore";
import ModalAddUser from "./ModalAddUser";
import { modalSelector } from "../../Slices/modalSice";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "511px",
  height: "298px",
  background: "#F6F6F6",
  borderRadius: "10px",
  border: "1px solid #DDDDDD",
  outline: "none",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const BasicModal = () => {
  const { isModal, modalScore, modalName, isAddUser } =
    useSelector(modalSelector);
  const { leaderBoard } = useSelector(leaderSelector);
  return (
    <div>
      <Modal
        open={isModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isAddUser ? (
            <ModalAddUser leaders={leaderBoard} />
          ) : (
            <ModalEditScore modalScore={modalScore} modalName={modalName} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
