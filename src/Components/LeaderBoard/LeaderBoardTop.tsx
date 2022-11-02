import Button from "@mui/material/Button/Button";
import React from "react";
import leftActiveArrow from "../../images/LeftActiveArrow.svg";
import rightActiveArrow from "../../images/LeftActiveArrow.svg";
import "./LeaderBoard.css";
import { setAddModalUser } from "../../Slices/modalSice";
import { useAppDispatch } from "../../Redux/hooks";
import { addNewDay, Leader } from "../../Slices/leaderSlice";

type LeaderBoardTopProps = {
  leaders: [Leader[]];
  page: number;
  isAnotherDayLoading: boolean;
  changePage: (a: number) => void;
};
const LeaderBoardTop = ({
  leaders,
  page,
  isAnotherDayLoading,
  changePage,
}: LeaderBoardTopProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="leaderBoard_container--top">
      <h2 className="leaderBoard_container-top--title">
        Leaders table for this period: {page + 1}
      </h2>
      <div className="leaderBoard_container--top-right">
        <div className="leaderBoard_container--top_arrows">
          <button
            disabled={!page && isAnotherDayLoading}
            className={"leader__top-arrow" + (!page ? " disabled-arrow" : "")}
            onClick={() => {
              page && changePage(-1);
            }}
            style={{
              backgroundImage: `url(${leftActiveArrow})`,
            }}
          ></button>
          <button
            disabled={page + 1 === leaders.length}
            onClick={() => {
              changePage(1);
            }}
            style={{
              backgroundImage: `url(${rightActiveArrow})`,
            }}
            className={
              "leader__top-arrow right-arrow " +
              (page + 1 === leaders.length ? " disabled-arrow" : "")
            }
          ></button>
        </div>
        <Button
          onClick={() => {
            dispatch(addNewDay());
          }}
          style={{
            borderRadius: 10,
            padding: "7px 26px",
            fontSize: "11px",
            width: "120px",
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
