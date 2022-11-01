import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import "./Modal.css";
import {
  addNewLeaderThunk,
  Leader,
  leaderSelector,
} from "../../Slices/leaderSlice";
import {
  modalSelector,
  setAddModalUser,
  setAlert,
} from "../../Slices/modalSice";
import close from "../../images/modal/close.svg";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

type FormValues = {
  name: string;
};

const ModalAddUser = () => {
  const { isAddUser } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "all" });
  const onSubmit = handleSubmit((data) => {
    dispatch(addNewLeaderThunk(data.name)).then(() => {
      dispatch(
        setAlert({ severity: "success", message: "User successfully added" })
      );
    });
    dispatch(setAddModalUser());
  });

  return isAddUser ? (
    <>
      <form className={"form"} onSubmit={onSubmit}>
        <div
          onClick={() => {
            dispatch(setAddModalUser());
          }}
        >
          <img className="close__btn" src={close} alt="close" />
        </div>

        <input
          placeholder={"Name"}
          className="modal__input"
          type="text"
          {...register("name", {
            required: "required field",
            minLength: { value: 3, message: "min length 3" },
          })}
        />

        {errors?.name && (
          <p className="validation__error">{errors.name.message}</p>
        )}
        <Button
          disabled={!isValid}
          type={"submit"}
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
      </form>
    </>
  ) : (
    <></>
  );
};

export default ModalAddUser;
