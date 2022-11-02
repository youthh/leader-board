import React, { createRef, useRef } from "react";
import BoardItem from "./LeaderBoadrItem/BoardItem";
import { Leader } from "../../Slices/leaderSlice";
import "./LeaderBoadrItem/LeaderBoardItem.css";
import { Box, CircularProgress, Fade } from "@mui/material";
import { motion } from "framer-motion";
interface Props {
  leaders: [Leader[]];
  page: number;
  isAnotherDayLoading: boolean;
}

const Board = ({ leaders, page, isAnotherDayLoading }: Props) => {
  return (
    <motion.div
      className={"leaderBoard_container--items"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {leaders[page].map((leader, index) => {
        index++;
        return (
          <BoardItem
            isAnotherDayLoading={isAnotherDayLoading}
            color={leader.color}
            changesCount={leader.changesCount}
            img={leader.img}
            key={Math.random()}
            score={leader.score}
            name={leader.name}
            index={index}
          />
        );
      })}
    </motion.div>
  );
};

export default Board;
