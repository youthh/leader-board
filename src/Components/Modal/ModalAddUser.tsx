import React, { useRef } from "react";
import Button from "@mui/material/Button";
import {
  addNewLeaderThunk,
  checkIfUserExist,
  Leader,
} from "../../Slices/leaderSlice";
import { setAddModalUser, setAlert } from "../../Slices/modalSice";
import close from "../../images/modal/close.svg";
import { useAppDispatch } from "../../Redux/hooks";

type ModalAddUserProps = {
  leaders: Leader[];
};

const ModalAddUser = ({ leaders }: ModalAddUserProps) => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);

  const onAddUserClick = (name: string) => {
    if (checkIfUserExist(leaders, name)) {
      dispatch(
        setAlert({ severity: "error", message: "User have already exist" })
      );
    } else if (!name) {
      dispatch(setAlert({ severity: "error", message: "Enter user name" }));
    } else {
      dispatch(addNewLeaderThunk(name)).then(() => {
        dispatch(
          setAlert({ severity: "success", message: "User successfully added" })
        );
      });
      dispatch(setAddModalUser());
    }
  };
  return (
    <>
      <div
        onClick={() => {
          dispatch(setAddModalUser());
        }}
      >
        <img className="close__btn" src={close} alt="close" />
      </div>
      <input
        ref={nameRef}
        placeholder={"Name"}
        className="modal__input"
        type="text"
      />

      <Button
        onClick={() => {
          onAddUserClick(nameRef.current ? nameRef.current.value : "");
        }}
        style={{
          borderRadius: "10px",
          padding: "8px 20px",
          fontSize: "13px",
          lineHeight: "12px",
          background: "#F99746",
          marginRight: "8px",
          fontWeight: "500",
          width: "100px",
          textTransform: "capitalize",
          color: "#030327",
          boxShadow: "0px 2px 8px rgba(249, 151, 70, 0.04)",
        }}
        variant="contained"
      >
        Add User
      </Button>
    </>
  );
};

export default ModalAddUser;
