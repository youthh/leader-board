import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import "./Modal.css";
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

type ModalProps = {
  children: React.ReactNode[];
};

const BasicModal = ({ children }: ModalProps) => {
  const { isModal } = useSelector(modalSelector);
  return (
    <div>
      <Modal
        open={isModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children.map((child) => child)}</Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
