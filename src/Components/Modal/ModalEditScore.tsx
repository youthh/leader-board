import React, { useRef } from "react";
import {
  checkIfUserExist,
  leaderSelector,
  onSaveScore,
} from "../../Slices/leaderSlice";
import { setModal } from "../../Slices/modalSice";
import person from "../../images/modal/ModalPic.svg";
import book from "../../images/modal/ModalBook.svg";
import close from "../../images/modal/close.svg";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  modalScore: number;
  modalName: string;
};

interface FormValues {
  name: string;
  score: number;
}

const ModalEditScore = ({ modalScore, modalName }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "all" });
  const onSubmit = handleSubmit((data) => {
    dispatch(
      onSaveScore({
        name: data.name,
        score: data.score,
      })
    );
    dispatch(setModal());
  });

  return (
    <form className="form" onSubmit={onSubmit}>
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
          defaultValue={modalName}
          className="modal__input"
          type="text"
          {...register("name", {
            required: "Name required field",
          })}
        />
        {errors?.name && (
          <p className="validation__error">{errors.name.message}</p>
        )}
        <input
          placeholder={"Points"}
          defaultValue={modalScore}
          className="modal__input"
          step="1"
          type="number"
          {...register("score", {
            required: "score required field",
          })}
        />
      </div>
      {errors?.score && (
        <p className="validation__error">{errors.score.message}</p>
      )}
      <Button
        type={"submit"}
        disabled={!isValid}
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
    </form>
  );
};

export default ModalEditScore;
