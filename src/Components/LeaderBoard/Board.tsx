import React from "react";
import BoardItem from "./LeaderBoadrItem/BoardItem";
import { Leader } from "../../Slices/leaderSlice";

interface Props {
  leaders: Leader[];
}

const Board = ({ leaders }: Props) => {
  return (
    <div className="leaderBoard_container--items">
      {leaders.map((i, index) => {
        index++;
        return (
          <BoardItem
            key={Math.random()}
            score={Object.hasOwn(i, "score") ? i.score : 0}
            name={i.name}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Board;
