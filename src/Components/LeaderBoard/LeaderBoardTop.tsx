import Button from "@mui/material/Button/Button";
import React from "react";
import leftActiveArrow from "../../images/LeftActiveArrow.svg";
import rightActiveArrow from "../../images/LeftActiveArrow.svg";
import "./LeaderBoard.css";

const LeaderBoardTop = () => {
  return (
    <div className="leaderBoard_container--top">
      <h2 className="leaderBoard_container-top--title">
        Leaders table for this period
      </h2>
      <div className="leaderBoard_container--top-right">
        <div className="leaderBoard_container--top_arrows">
          <img
            className="leaderBoard_container--top-arrow"
            src={leftActiveArrow}
            alt="arrow"
          />
          <img
            className="leaderBoard_container--top-arrow right-arrow"
            src={rightActiveArrow}
            alt="arrow"
          />
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
          style={{
            borderRadius: 10,
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
