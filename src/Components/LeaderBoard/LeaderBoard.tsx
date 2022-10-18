import React, { useEffect } from "react";
import LeaderBoardTop from "./LeaderBoardTop";
import Board from "./Board";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getLeaderHeader, leaderSelector } from "../../Slices/leaderSlice";
import "./LeaderBoard.css";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
const LeaderBoard = () => {
  const dispatch = useAppDispatch();
  const { leaderBoard, isLoading } = useAppSelector(leaderSelector);

  useEffect(() => {
    dispatch(getLeaderHeader());
  }, []);

  const onClickEdit = (name: string, score: number): void => {
    console.log(score);
  };

  return (
    <div
      className="leaderBoard_container"
      style={
        isLoading
          ? { justifyContent: "flex-start" }
          : { justifyContent: "center" }
      }
    >
      <LeaderBoardTop />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Board onClickEdit={onClickEdit} leaders={leaderBoard} />
      )}
    </div>
  );
};

export default LeaderBoard;
