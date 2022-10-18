import React from "react";
import BoardItem from "./LeaderBoadrItem/BoardItem";
import { Leader } from "../../Slices/leaderSlice";
import "./LeaderBoadrItem/LeaderBoardItem.css";

interface Props {
  leaders: Leader[];
  onClickEdit: any;
}

const Board = ({ onClickEdit, leaders }: Props) => {
  return (
    <div className="leaderBoard_container--items">
      {leaders.map((i, index) => {
        index++;
        return (
          <BoardItem
            onClickEdit={onClickEdit}
            img={i.img}
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
