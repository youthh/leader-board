import Button from "@mui/material/Button/Button";
import React from "react";
import leftActiveArrow from "../../images/LeftActiveArrow.svg";
import rightActiveArrow from "../../images/LeftActiveArrow.svg";
import "./LeaderBoard.css";
import { leaderSelector } from "../../Slices/leaderSlice";
import { setAddModalUser } from "../../Slices/modalSice";
import { useAppDispatch } from "../../Redux/hooks";
import { useSelector } from "react-redux";

const LeaderBoardTop = () => {
  const { isAddedUserLoading } = useSelector(leaderSelector);
  const dispatch = useAppDispatch();
  return (
    <div className="leaderBoard_container--top">
      <h2 className="leaderBoard_container-top--title">
        Leaders table for this period
      </h2>
      <div className="leaderBoard_container--top-right">
        <div className="leaderBoard_container--top_arrows">
          <button
            className={"leader__top-arrow"}
            style={{
              backgroundImage: `url(${leftActiveArrow})`,
            }}
          ></button>
          <button
            disabled={true}
            style={{
              cursor: "not-allowed",
              backgroundImage: `url(${rightActiveArrow})`,
            }}
            className={"leader__top-arrow right-arrow"}
          ></button>
        </div>
        <Button
          style={{
            borderRadius: 10,
            padding: "7px 26px",
            fontSize: "11px",
            lineHeight: "12px",
            background: "#F99746",
            marginRight: "8px",
            fontWeight: "600",
          }}
          variant="contained"
        >
          New day
        </Button>
        <Button
          onClick={() => {
            dispatch(setAddModalUser());
          }}
          color={"secondary"}
          style={{
            borderRadius: 10,
            width: "150px",
            minHeight: "26px",
            padding: "7px 26px",
            fontSize: "11px",
            lineHeight: "12px",
            fontWeight: "600",
            background: "#1E3CA9",
          }}
          variant="contained"
        >
          Add new user
        </Button>
      </div>
    </div>
  );
};

export default LeaderBoardTop;
