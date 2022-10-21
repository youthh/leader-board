import React, { useRef } from "react";
import { onSaveScore } from "../../Slices/leaderSlice";
import { setModal } from "../../Slices/modalSice";
import person from "../../images/modal/ModalPic.svg";
import book from "../../images/modal/ModalBook.svg";
import close from "../../images/modal/close.svg";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

type Props = {
  modalScore: number;
  modalName: string;
};

const ModalEditScore = ({ modalScore, modalName }: Props) => {
  const dispatch = useDispatch();
  const refName = useRef<HTMLInputElement>(null);
  const refScore = useRef<HTMLInputElement>(null);
  return (
    <>
      <div
        onClick={() => {
          dispatch(setModal());
        }}
      >
        <img className="close__btn" src={close} alt="close" />
      </div>
      <img className={"modal__img person"} src={person} alt="" />
      <img className={"modal__img"} src={book} alt="" />
      <h2 className="modal__title">Edit user score</h2>
      <div className="modal__box--input">
        <input
          placeholder={"Name"}
          ref={refName}
          defaultValue={modalName}
          className="modal__input"
          type="text"
        />
        <input
          placeholder={"Points"}
          ref={refScore}
          defaultValue={modalScore}
          className="modal__input"
          step="1"
          type="number"
        />
      </div>
      <Button
        onClick={() => {
          dispatch(setModal());
          dispatch(
            onSaveScore({
              name: refName.current ? refName.current.value : "",
              score: refScore.current ? parseInt(refScore.current.value) : 0,
            })
          );
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
        Save
      </Button>
    </>
  );
};

export default ModalEditScore;
