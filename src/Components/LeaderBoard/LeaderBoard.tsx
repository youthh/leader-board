import React, { useEffect } from "react";
import LeaderBoardTop from "./LeaderBoardTop";
import Board from "./Board";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  getLeaderHeader,
  leaderSelector,
  setLeadersLoading,
  setPage,
} from "../../Slices/leaderSlice";
import "./LeaderBoard.css";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const LeaderBoard = () => {
  const dispatch = useAppDispatch();
  const { leaderBoard, page, isAnotherDayLoading } =
    useAppSelector(leaderSelector);

  const changePage = (a: number) => {
    dispatch(setLeadersLoading(true));
    setTimeout(() => {
      dispatch(setLeadersLoading(false));
    }, 500);
    dispatch(setPage(a));
  };

  useEffect(() => {
    dispatch(getLeaderHeader());
    setTimeout(() => {
      dispatch(setLeadersLoading(false));
    }, 1100);
  }, []);

  return (
    <div className="leaderBoard_container">
      <LeaderBoardTop
        changePage={changePage}
        page={page}
        leaders={leaderBoard}
        isAnotherDayLoading={isAnotherDayLoading}
      />
      {isAnotherDayLoading ? (
        <CircularProgress style={{ marginTop: "20px" }} />
      ) : (
        <Board
          page={page}
          isAnotherDayLoading={isAnotherDayLoading}
          leaders={leaderBoard}
        />
      )}
    </div>
  );
};

export default LeaderBoard;
