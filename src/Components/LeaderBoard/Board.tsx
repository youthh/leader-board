import React from "react";
import BoardItem from "./LeaderBoadrItem/BoardItem";
import { Leader } from "../../Slices/leaderSlice";
import "./LeaderBoadrItem/LeaderBoardItem.css";

interface Props {
  leaders: Leader[];
}

const Board = ({ leaders }: Props) => {
  return (
    <div className="leaderBoard_container--items">
      {leaders.map((leader, index) => {
        index++;
        return (
          <BoardItem
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
    </div>
  );
};

export default Board;
